import { Request, Response } from 'express'
import { UserInterface } from '../../../interface/User/IUser'
import User from '../../models/User/UserModel'

class AdministratorController {

    public async index(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        try {

            const userLogged = await User.findById(id) as UserInterface
            if (!userLogged) return res.status(400).json({message: 'Não encontrado!'})
            return res.send(userLogged)
            
        } catch (e) {
            return res.status(400).json(e)
        }
    }
}

export default new AdministratorController()