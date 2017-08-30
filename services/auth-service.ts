import { IUserModel } from '../schemas/user';
import { Action } from 'routing-controllers';
import { verify } from 'jsonwebtoken'
import { secret } from '../config';
import { UserService } from './user-service';

export const verifyToken = async (action: Action, roles: string [] = ['commonUser']) => {
        let token: string = undefined
        if(!(action.request.headers["authorization"] && action.request.headers["authorization"].split(' ')[0] === 'Bearer' && action.request.headers["authorization"].split(' ')[1].length)) {
            return false
        }
        token = action.request.headers["authorization"].split(' ')[1]
        const decoded = await new Promise((resolve, reject) => {
            verify(token, secret, (err:Error, decoded) => {
                if(err) {
                    return reject(false)
                }
                if(decoded) {
                    return resolve(decoded)
                }
            })
        })
        if(!decoded) {
            return false
        } 
        const user: IUserModel = JSON.parse(JSON.stringify(decoded))
        const _user = await new UserService().findOne(user._id)
        if (roles.find(role => _user.roles.indexOf(role) === -1)) {
            return false
        }
        return true
    }
export const getUser = async (action: Action) => {
    const token = action.request.headers["authorization"].split(' ')[1]
    const decoded = await new Promise((resolve, reject) => {
        verify(token, secret, (err:Error, decoded: object) => {
            if(err) {
                return reject(false)
            }
            if(decoded) {
                return resolve(decoded)
            }
        })
    })
    const user: IUserModel = JSON.parse(JSON.stringify(decoded))
    return await new UserService().findOne(user._id)
}