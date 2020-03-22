import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { ConnectionBD } from './database/index'
import UserRouter from './App/routes/UsersRouter'
import config from './config/env.json'
import ClienteRouter from './App/routes/Cliente/ClienteRouter'
import AdministratorRouter from './App/routes/Admistrator/AdministratorRouter'

class App {
    public app: express.Application

    public constructor() {
        this.app = express()
        // configuração da porta
        this.app.set('port', 3333 || config.Server.Port)
        this.middlewares()
        this.database()
        this.routes()
    }
    private middlewares(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cors())
        this.app.use(morgan("combined"))
    }
    private database(): void {
        ConnectionBD
    }
    private routes(): void {
        this.app.use('/api/auth', UserRouter)
        this.app.use('/api/auth', AdministratorRouter)
        this.app.use('/api/auth', ClienteRouter)
    }
}
export default new App().app;