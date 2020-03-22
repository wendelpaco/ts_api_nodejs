import Joi from '@hapi/joi'
import { UserInterface } from '../../../interface/User/IUser'


export const CreateUserValidation = (data: UserInterface): Joi.ValidationResult => {
    const userSchema = Joi.object({
        username: Joi
            .string()
            .min(4)
            .max(30)
            .required(),
        email: Joi
            .string()
            .required(),
        password: Joi
            .string()
            .min(6)
            .required()
    })
    return userSchema.validate(data)
}

export const LoginValidation = (data: UserInterface): Joi.ValidationResult => {
    const userSchema = Joi.object({
        email: Joi
            .string()
            .required(),
        password: Joi
            .string()
            .min(6)
            .required()
    });
    return userSchema.validate(data);
};