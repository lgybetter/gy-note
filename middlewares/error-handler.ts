import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { ErrorRequestHandler, Request, Response } from 'express';
import { IError } from '../interfaces/res-data'

@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: IError, req: Request, res: Response, next: (err?: IError) => any) {
        console.log('fuck error!!', error)
        if (!error.code) {
            res.json({
                code: 500,
                msg: error.message
            })
        }
        res.json(error)
    }
}