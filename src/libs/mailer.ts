import nodemailer from 'nodemailer'
import mailConfig from '../config/env.json'

export const ServidorEmail = nodemailer.createTransport(mailConfig.Mailer)