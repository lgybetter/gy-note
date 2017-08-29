import { JsonController, Param, Body, Get, Post, Put, Delete} from 'routing-controllers'
import { Service } from 'typedi'
import { UserService } from '../services/user-service'
import { User, UserSchema, IUserModel } from '../schemas/user';
import { DocumentQuery, Schema, Model, model} from 'mongoose'
import { mongoIdToWebId } from '../utils/filters'

@Service()
@JsonController()
export class UserController {
    constructor(private userService: UserService) {}
    @Get('/users')
    getAll(): Promise<Object> {
        return this.userService.findAll().then(data => data.map(mongoIdToWebId))
    }

    @Get('/users/:id')
    getOne(@Param('id') id: number): Promise<Object> {
        return this.userService.findOne(id).then(data => mongoIdToWebId(data))
    }

    @Post('/users')
    post(@Body() user: IUserModel): Promise<Object> {
        return this.userService.save(user).then(data => mongoIdToWebId(data))
    }

    @Delete('/users/:id')
    del(@Param('id') id: number): Promise<Object> {
        return this.userService.remove(id).then(data => mongoIdToWebId(data))
    }
}
