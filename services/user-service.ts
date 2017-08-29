import { Service } from 'typedi'
import { User, IUserModel } from '../schemas/user'
import { mongoIdToWebId } from '../utils/filters'

@Service()
export class UserService {
    async findAll() {
        const users = await User.find().select('-password')
        return users.map(mongoIdToWebId)
    }
    async findOne(id: string) {
        try {
            const user = await User.findById(id).select('-password')
            return mongoIdToWebId(user)
        } catch (error) {
            return Promise.reject({ code: 404, msg: '用户不存在' })
        }
    }
    async save(user: IUserModel) {
        const count = await User.count({ email: user.email })
        if(count > 0) {
            return Promise.reject({ code: 400, msg: '用户已经存在' })
        }
        const _user = await new User(user).save()
        return Promise.resolve(mongoIdToWebId({ ...user, _id: _user._id }))
    }
    async remove(id: string) {
        try {
            const user = await User.findByIdAndRemove(id).select('-password')
            return mongoIdToWebId(user)
        } catch (error) {
            return Promise.reject({ code: 404, msg: '用户不存在' })
        }
    }
}