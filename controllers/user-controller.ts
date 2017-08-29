import { JsonController, Param, Body, Get, Post, Put, Delete} from 'routing-controllers'
import { Service } from 'typedi'
import { UserService } from '../services/user-service'
import { User, UserSchema, IUserModel } from '../schemas/user';
import { DocumentQuery, Schema, Model, model} from 'mongoose'

@Service()
@JsonController()
export class UserController {
    constructor(private userService: UserService) {}
    @Get('/users')
    async getAll(): Promise<object> {
        try {
            return await this.userService.findAll()
        } catch (err) {
            if (!err.code) {
                return {
                    code: 500,
                    msg: err.message
                }
            }
            return err
        }
    }

    @Get('/users/:id')
    async getOne(@Param('id') id: string): Promise<object> {
        try {
            return await this.userService.findOne(id)
        } catch (err) {
            if (!err.code) {
                return {
                    code: 500,
                    msg: err.message
                }
            }
            return err
        }
    }

    @Post('/users')
    async post(@Body() user: IUserModel): Promise<object> {
        try {
            return await this.userService.save(user)
        } catch (err) {
            if (!err.code) {
                return {
                    code: 500,
                    msg: err.message
                }
            }
            return err
        }
    }

    @Delete('/users/:id')
    async del(@Param('id') id: string): Promise<object> {
        try {
            return await this.userService.remove(id)
        } catch (err) {
            if (!err.code) {
                return {
                    code: 500,
                    msg: err.message
                }
            }
            return err
        }
    }
}
