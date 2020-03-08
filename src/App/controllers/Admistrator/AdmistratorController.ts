import { Request, Response } from 'express'
import { UserInterface } from '../../../interface/User/IUser'
import User from '../../models/User/User'


class AdministratorController {

    public async index(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        try {

            const userLogged: UserInterface = new User({

            })


            return res.send(userLogged)
        } catch (e) {
            return res.status(400).json(e)
        }


    }
}

export default new AdministratorController()