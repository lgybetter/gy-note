import {　Middleware, ExpressMiddlewareInterface } from 'routing-controllers'
import { Request, Response, NextFunction } from 'express'

@Middleware({ type: 'before' })
export class LogUrlMidd implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next: NextFunction): void {
        console.log(req.url)
        next()
    }
}