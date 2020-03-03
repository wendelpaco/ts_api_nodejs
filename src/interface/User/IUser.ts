import { Document } from 'mongoose'

export interface UserInterface extends Document {
    username: string;
    email: string;
    password: string;
    encrypPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}