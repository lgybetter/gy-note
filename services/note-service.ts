import { DATA_CREATE_FAIL, DATA_DELETE_FAIL, DATA_NOT_FOUND, DATA_UPDATE_FAIL } from '../tips/restful-tips';
import { IUserModel } from '../schemas/user';
import { Service } from 'typedi';
import { Note, INoteModel } from '../schemas/note';

@Service()
export class NoteService {
    async findAll(user: IUserModel) {
        return await Note.find({ createdBy: user._id })
    }
    async findOne(id: string, user: IUserModel) {
        try {
            return await Note.findOne({_id: id, createdBy: user._id })
        } catch (error) {
            return Promise.reject({ code: 400, msg: DATA_NOT_FOUND })            
        }
    }
    async save(note: INoteModel, user: IUserModel) {
        try {
            return await new Note({ createdBy: user._id, ...note }).save()
        } catch (error) {
            return Promise.reject({ code: 400, msg: DATA_CREATE_FAIL })
        }
    }
    async remove(id: string, user: IUserModel) {
        try {
            return await Note.findOneAndRemove({ _id: id, createdBy: user._id })
        } catch (error) {
            return Promise.reject({ code: 400, msg: DATA_DELETE_FAIL })            
        }
    }
    async update(id: string, note: INoteModel, user: IUserModel) {
        try {
            return await Note.findOneAndUpdate({ _id: id, createdBy: user._id},  note)
        } catch (error) {
            return Promise.reject({ code: 400, msg: DATA_UPDATE_FAIL})
        }
    }
}