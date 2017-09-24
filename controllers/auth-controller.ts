import { IUserModel } from '../schemas/user';
import { Body, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { UserService } from '../services/user-service';

@Service()
@JsonController()
export class AuthController {
    constructor (private userService: UserService) {}
    @Post('/signUp')
    async signUp(@Body({ required: true }) user: IUserModel): Promise<object> {
        return await this.userService.save(user)
    }
    @Post('/signIn')
    async signIn(@Body({ required: true }) user: IUserModel): Promise<object> {
        return await this.userService.verifyUser(user)
    }
}