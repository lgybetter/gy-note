import { Service } from 'typedi'
import { User, IUserModel } from '../schemas/user'

@Service()
export class UserService {
    async findAll() {
        return await User.find()
    }
    async findOne(id: number) {
        return await User.findById(id)
    }
    async save(user: IUserModel) {
        return await new User(user).save()
    }
    async remove(id: number) {
        return await User.findByIdAndRemove(id)
    }
}