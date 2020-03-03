import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { ConnectionBD } from './database/index'
import AuthController from './App/routes/Auth'
import config from './config/env.json'

class App {
    public express: express.Application

    public constructor() {
        this.express = express()
        // configuração da porta
        this.express.set('port', 3333 || config.Server.Port )
        this.middlewares()
        this.database()
        this.routes()
    }
    private middlewares(): void {
        this.express.use(express.json())
        this.express.use(cors())
        this.express.use(morgan("dev"))
    }
    private database(): void {
        ConnectionBD
    }
    private routes(): void {
        this.express.use('/api/auth', AuthController)
    }

}

export default new App().express;