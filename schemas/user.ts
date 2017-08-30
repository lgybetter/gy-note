import { Document, Schema, Model, model} from 'mongoose'

export interface IUserModel extends Document {
    email: string
    name: string
    password?: string,
    roles?: string[]
}

export const UserSchema: Schema = new Schema({
    email: String,
    name: String,
    password: String,
    roles: { type: Array, default: ['commonUser'] }, // commonUser: 普通用户　admin: 管理员 
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema)
