import { JsonController, Controller, Param, Body, Get, Post, Put, Delete, Res, Req, UseInterceptor } from 'routing-controllers'
import { Request, Response, NextFunction } from 'express'
import { Service } from 'typedi'
import { UserService } from '../services/user-service'
import { User, UserSchema, IUserModel } from '../schemas/user'
import { DocumentQuery, Schema, Model, model} from 'mongoose'
import { FormatMongoInterceptor } from '../interceptors/format-mongo'

@Service()
@JsonController('/users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get()
    @UseInterceptor(FormatMongoInterceptor)
    async getAll(): Promise<object> {
        return await this.userService.findAll()
    }

    @Get('/:id')
    @UseInterceptor(FormatMongoInterceptor)
    async getOne(@Param('id') id: string): Promise<object> {
        return await this.userService.findOne(id)
    }

    @Post()
    @UseInterceptor(FormatMongoInterceptor)
    async post(@Body({ required: true }) user: IUserModel): Promise<object> {
        return await this.userService.save(user)
    }

    @Delete('/:id')
    @UseInterceptor(FormatMongoInterceptor)
    async del(@Param('id') id: string): Promise<object> {
        return await this.userService.remove(id)
    }
}
