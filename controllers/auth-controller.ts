import { IUserModel } from '../schemas/user';
import { Body, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { UserService } from '../services/user-service';

@Service()
@JsonController()
export class AuthController {
    constructor (private userService: UserService) {}
    @Post('/singUp')
    async signUp(@Body({ required: true }) user: IUserModel): Promise<object> {
        return await this.userService.save(user)
    }
    @Post('/singIn')
    async signIn(@Body({ required: true }) user: IUserModel): Promise<object> {
        return await this.userService.verifyUser(user)
    }
}