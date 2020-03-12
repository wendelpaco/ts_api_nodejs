import { Schema, model } from 'mongoose'
import { ClienteInterface } from '../../../interface/Cliente/ICliente';

const ClienteScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    celular: {
        type: String,
        required: true
    },
    dataNascimento: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

export default model<ClienteInterface>('Cliente', ClienteScheme)