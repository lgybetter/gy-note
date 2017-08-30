import { Authorized, CurrentUser, JsonController, Controller, Param, Body, Get, Post, Put, Delete, Res, Req, UseInterceptor } from 'routing-controllers'
import { Request, Response, NextFunction } from 'express'
import { Service } from 'typedi'
import { UserService } from '../services/user-service'
import { User, UserSchema, IUserModel } from '../schemas/user';
import { DocumentQuery, Schema, Model, model} from 'mongoose'

@Service()
@JsonController('/users')
export class UserController {
    constructor(private userService: UserService) {}
    @Authorized()
    @Get()
    async getAll(@CurrentUser({ required: true }) user: IUserModel) {
        return await this.userService.findAll()
    }
    @Get('/:id')
    async getOne(@Param('id') id: string) {
        return await this.userService.findOne(id)
    }
    @Delete('/:id')
    async del(@Param('id') id: string) {
        return await this.userService.remove(id)
    }
}
