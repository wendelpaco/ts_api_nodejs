import { Request, Response } from 'express'

import User from '../models/User/UserModel'
import jwt from 'jsonwebtoken'
import config from '../../config/env.json'
import { UserInterface } from '../../interface/User/IUser'
import { CreateUserValidation, LoginValidation } from '../../libs/validation/User/UserValidation'

class AuthController {

  public async GetAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.find()
      if (!user) {
        return res.status(404).json({ codigo: 100, message: 'Nenhum usuário encontrado no sistema, por favor, cadastre um novo usuário.' })
      }
      return res.json(user)
    } catch (e) {
      return res.status(400).json({ codigo: 106, message: e.message })
    }
  }

  public async CreateUser(req: Request, res: Response): Promise<Response> {

    //Validation
    const { error } = CreateUserValidation(req.body)
    if (error) return res.status(400).json({ codigo: 101, message: error.message })

    // Email Validation
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).json({ codigo: 102, message: 'O endereço do e-mail enviado não existe.' })

    if (!req.body.username || !req.body.username || !req.body.password) return res.status(400).json({ codigo: 110, message: 'Nenhuma dado foi enviado para o cadastro' })
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
      return res.header('authorization', token).status(201).json({ codigo: 103, message: 'Usuário criado com sucesso.', token })
    } catch (e) {
      return res.status(400).json({ codigo: 106, message: e.message })
    }
  }

  public async Login(req: Request, res: Response): Promise<Response> {

    try {
      const { error } = LoginValidation(req.body)

      if (error) return res.status(400).json({ codigo: 101, message: error.message })

      const user = await User.findOne({ email: req.body.email }).select('+password')
      if (!user) return res.status(400).json({ codigo: 104, message: 'E-mail ou senha incorretos' })

      const correctPassword = await user.validatePassword(req.body.password)

      if (!correctPassword) return res.status(400).json({ codigo: 105, message: 'Senha incorreta' })

      // Create a Token
      const token: string = jwt.sign({ _id: user._id }, config.Token.ApiKey || 'wendel')
      return res.header('authorization', token).json({ codigo: 109, message: token })
    } catch (e) {
      return res.status(400).json({ codigo: 106, message: e.message })
    }
  }

  public async Destroy(req: Request, res: Response): Promise<Response> {

    try {
      const { id } = req.params
      await User.findByIdAndDelete(id)
      return res.json({ codigo: 107, message: 'Usuário excluído com sucesso!' })
    } catch (e) {
      return res.status(400).json({ codigo: 106, message: e.message })
    }

  }
}
export default new AuthController();