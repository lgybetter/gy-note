import { Document, Schema, Model, model } from 'mongoose'
import { IUserModel } from './user';

export interface INoteModel extends Document {
    content: string,
    createdBy: string
}

export const NoteSchema: Schema = new Schema({
    content: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
export const Node: Model<INoteModel> = model<INoteModel>('Note', NoteSchema)