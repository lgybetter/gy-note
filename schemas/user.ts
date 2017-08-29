import { Document, Schema, Model, model} from 'mongoose'

export interface IUserModel extends Document {
    email: string
    name: string
}

export const UserSchema: Schema = new Schema({
    email: String,
    name: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema)

