import { Document, Schema, Model, model } from 'mongoose'
import { IUserModel } from './user';

export interface INoteModel extends Document {
    content: string,
    status?: number,
    createdBy?: string
}

export const NoteSchema: Schema = new Schema({
    content: String,
    status: { type: Number, default: -1 }, // 是否完成　-1: 未完成 1: 完成
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
export const Note: Model<INoteModel> = model<INoteModel>('Note', NoteSchema)