import { INoteModel } from '../schemas/note';
import { IUserModel } from '../schemas/user';
import { NoteService } from '../services/note-service';
import { Authorized, Body, CurrentUser, Delete, Get, JsonController, Param, Post, Put } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController('/notes')
export class NoteController {
    constructor(private noteService: NoteService) {}
    @Authorized()
    @Get()
    async getAll(@CurrentUser({ required: true }) user: IUserModel) {
        return await this.noteService.findAll(user)
    }
    @Get('/:id')
    async getOne(@CurrentUser({ required: true }) user: IUserModel, @Param('id') id: string) {
        return await this.noteService.findOne(id, user)
    }
    @Delete('/:id')
    async del(@Param('id') id: string, @CurrentUser({ required: true }) user: IUserModel) {
        return await this.noteService.remove(id, user)
    }
    @Post()
    async create(@Body() note: INoteModel, @CurrentUser({ required: true }) user: IUserModel) {
        return await this.noteService.save(note.content, user)
    }
    @Put('/:id')
    async update(@Body() note: INoteModel, @CurrentUser({ required: true }) user: IUserModel, @Param('id') id: string) {
        return await this.noteService.update(id, note.content, user)
    }
}