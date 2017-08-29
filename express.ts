import 'reflect-metadata'
import { createExpressServer, useContainer, useExpressServer, Controller, UseBefore } from 'routing-controllers';
import { Container } from 'typedi'
import Controllers from './controllers'
import { LogMidd } from './middlewares/log-midd'
import { ErrorHandler } from './middlewares/error-handler'
import { Request, Response, NextFunction } from 'express'
import { ResDataFormatInterceptor } from './interceptors/res-data-format'
import { port, host } from './config'

useContainer(Container)

const expressApp = createExpressServer({
    controllers: Controllers,
    defaultErrorHandler: false,
    middlewares: [
        LogMidd,
        ErrorHandler
    ],
    interceptors: [
        ResDataFormatInterceptor
    ]
})

// global middlewares
// expressApp.use((req: Request, res: Response, next: NextFunction): void => {
//     console.log(req.url)
//     next()
// })

expressApp.listen(port, host, () => {
    console.log('Server is up and running at port 3000')
})


