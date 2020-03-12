import { Document } from 'mongoose'

export interface ClienteInterface extends Document {
    name: string;
    cpf: string;
    celular: string;
    dataNascimento?: string;
}