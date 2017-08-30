import { secret } from '../config';
import { Service } from 'typedi'
import { User, IUserModel } from '../schemas/user'
import { mongoIdToWebId } from '../utils/filters'
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
            return Promise.reject({ code: 404, msg: '用户不存在' })
        }
    }
    async save(user: IUserModel) {
        const count = await User.count({ email: user.email })
        if(count > 0) {
            return Promise.reject({ code: 400, msg: '用户已经存在' })
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
            return Promise.reject({ code: 404, msg: '用户不存在' })
        }
    }
    async verifyUser(user: IUserModel) {
        const count = await User.count({ email: user.email })
        if(count <= 0) {
            return Promise.reject({ code: 404, msg: '用户账户不存在' })
        }
        const _user = await User.findOne({ email: user.email })
        user.password = SHA3(user.password).toString()
        if(_user.password !== user.password) {
            return Promise.reject({ code: 400, msg: '用户口令验证出错' })
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