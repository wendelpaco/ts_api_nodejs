import { ClienteInterface } from './../../../interface/Cliente/ICliente';
import joi from '@hapi/joi'

export const ClienteValidation = (data: ClienteInterface): joi.ValidationResult => {
    const clienteScheme = joi.object({
           name: joi
           .string()
           .min(5)
           .max(20)
           .required(),
           cpf: joi
           .string()
           .min(11)
           .required(),
           celular: joi
           .string()
           .min(11)
           .max(11)
           .required(),
           dataNascimento: joi
           .string()
           .min(8)
           .max(8)

    })
    return clienteScheme.validate(data)
}