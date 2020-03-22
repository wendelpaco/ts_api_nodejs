import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../../config/env.json'


export interface Payload {
  _id: string;
  iat: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers['authorization'] || ''

    if (!token) res.status(401).send({ message: 'nenhum token foi fornecido' })

    const parts = token.split(' ')
    if (parts.length < 2) res.status(401).send({ message: 'Erro no token' })

    const [scheme, authToken] = parts

    if (!/^Bearer$/i.test(scheme)) res.status(401).send({ message: 'Token mal formatado' })

    const payload = jwt.verify(authToken, config.Token.ApiKey) as Payload
    req.userId = payload._id

    return next()

  } catch (e) {
     res.status(400).json({ message: 'Token Expirado' })
  }
}
