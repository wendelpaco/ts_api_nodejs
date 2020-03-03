import { Schema, model } from 'mongoose'
import bcryptjs from 'bcryptjs'

import { UserInterface  } from '../../../interface/User/IUser'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        lowercase: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        // select: false
    }
}, { timestamps: true })

userSchema.methods.encrypPassword = async (password: string): Promise<string> => {
    const salt = await bcryptjs.genSalt(10)
    return await bcryptjs.hash(password, salt)
}

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcryptjs.compare(password, this.password)
}

export default model<UserInterface>('User', userSchema)