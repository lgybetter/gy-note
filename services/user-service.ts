import { USER_EXISTED, USER_NOT_FOUND, USER_UPDATE_FAIL, USER_VERIFY_TOKEN_FAIL } from '../tips/restful-tips';
import { secret } from '../config';
import { Service } from 'typedi'
import { User, IUserModel } from '../schemas/user'
import { SHA3 } from 'crypto-js'
import { sign, verify } from 'jsonwebtoken';

@Service()
export class UserService {
    async findAll() {
        return await User.find().select('-password')
    }
    async findOne(id: string) {
        try {
            return await User.findById(id).select('-password')
        } catch (error) {
            return Promise.reject({ code: 404, msg: USER_NOT_FOUND })
        }
    }
    async save(user: IUserModel) {
        const count = await User.count({ email: user.email })
        if(count > 0) {
            return Promise.reject({ code: 400, msg: USER_EXISTED })
        }
        user.password = SHA3(user.password).toString()
        const _user = await new User(user).save()
        delete user.password
        return Promise.resolve({ ...user, _id: _user._id })
    }
    async remove(id: string) {
        try {
            return await User.findByIdAndRemove(id).select('-password')
        } catch (error) {
            return Promise.reject({ code: 404, msg: USER_NOT_FOUND })
        }
    }
    async update(id: string, user:IUserModel) {
        try {
            return await User.findByIdAndUpdate(id, user).select('-password')
        } catch (error) {
            return Promise.reject({ code: 400, msg: USER_UPDATE_FAIL })
        }
    }
    async verifyUser(user: IUserModel) {
        const count = await User.count({ email: user.email })
        if(count <= 0) {
            return Promise.reject({ code: 404, msg: USER_NOT_FOUND })
        }
        const _user = await User.findOne({ email: user.email })
        user.password = SHA3(user.password).toString()
        if(_user.password !== user.password) {
            return Promise.reject({ code: 400, msg: USER_VERIFY_TOKEN_FAIL })
        }
        const payload = {
            name: _user.name,
            email: _user.email,
            _id: _user._id
        }
        const token = `Bearer ${sign(payload, secret)}`
        return Promise.resolve({...payload, token })
    }
}