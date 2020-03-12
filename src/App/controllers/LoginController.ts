import { Request, Response } from 'express'

import User from '../models/User/UserModel'
import jwt from 'jsonwebtoken'
import config from '../../config/env.json'
import { UserInterface } from '../../interface/User/IUser'
import { signupValidation, signinValidation } from '../../libs/validation/User/UserValidation'

class LoginController {

  public async GetPerfil(req: Request, res: Response): Promise<Response> {
    const user = await User.findById(req.userId, { password: 0 })
    if (!user) {
      return res.status(404).json('No User found')
    }
    return res.json(user)
  }

  public async Signup(req: Request, res: Response): Promise<Response> {
    //Validation
    const { error } = signupValidation(req.body)
    if (error) return res.status(400).json(error.message)

    // Email Validation
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).json('Email already exists')
    // Saving a new User
    try {
      const newUser: UserInterface = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      newUser.password = await newUser.encrypPassword(newUser.password)
      const savedUser = await newUser.save()

      const token: string = jwt.sign({ _id: savedUser._id }, config.Token.ApiKey || 'wendel', {
        expiresIn: 60 * 60 * 24
      })
      return res.header('authorization', token).status(201).json({ status: 'user created with sucess', token })
    } catch (e) {
      return res.status(400).json(e)
    }
  }

  public async Signin(req: Request, res: Response): Promise<Response> {
    const { error } = signinValidation(req.body)

    if (error) return res.status(400).json(error.message)

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json('Email or Password is wrong')

    const correctPassword = await user.validatePassword(req.body.password)

    if (!correctPassword) return res.status(400).json('Invalid Password')

    // Create a Token
    const token: string = jwt.sign({ _id: user._id }, config.Token.ApiKey || 'wendel')
    return res.header('authorization', token).json(token)
  }
}

// export const signup = async (req: Request, res: Response): Promise<Response> => {
//   // Validation
//   const { error } = signupValidation(req.body)
//   if (error) return res.status(400).json(error.message)

//   // Email Validation
//   const emailExists = await User.findOne({ email: req.body.email })
//   if (emailExists) return res.status(400).json('Email already exists')
//   // Saving a new User
//   try {
//     const newUser: IUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password
//     })
//     newUser.password = await newUser.encrypPassword(newUser.password)
//     const savedUser = await newUser.save()

//     const token: string = jwt.sign({ _id: savedUser._id }, config.Token.ApiKey || 'wendel', {
//       expiresIn: 60 * 60 * 24
//     })
//     return res.header('auth-token', token).status(201).json({ status: 'user created with sucess', token })
//   } catch (e) {
//     return res.status(400).json(e)
//   }
// }

// export const signin = async (req: Request, res: Response): Promise<Response> => {
//   const { error } = signinValidation(req.body)

//   if (error) return res.status(400).json(error.message)

//   const user = await User.findOne({ email: req.body.email })
//   if (!user) return res.status(400).json('Email or Password is wrong')
//   const correctPassword = await user.validatePassword(req.body.password)

//   if (!correctPassword) return res.status(400).json('Invalid Password')

//   // Create a Token
//   const token: string = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'wendel')
//   return res.header('auth-token', token).json(token)
// }

// export const profile = async (req: Request, res: Response): Promise<Response> => {
//   const user = await User.findById(req.userId, { password: 0 })

//   if (!user) {
//     return res.status(404).json('No User found')
//   }
//   return res.json(user)
// }
export default new LoginController();