import {　Middleware, ExpressMiddlewareInterface } from 'routing-controllers'
import { Request, Response, NextFunction } from 'express'

@Middleware({ type: 'after' })
export class LogMidd implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next: NextFunction): void {
        console.log(`${req.method} - ${req.url}:`)
        if(req.body) {
            console.dir(JSON.parse(JSON.stringify(req.body)))
        }
        console.log(`Response: ${res.statusCode} - ${res.statusMessage}`)
        next()
    }
}