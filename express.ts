import 'reflect-metadata'
import { createExpressServer, useContainer, useExpressServer, Controller, UseBefore } from 'routing-controllers';
import { Container } from 'typedi'
import Controllers from './controllers'
import { LogMidd } from './middlewares/log-midd'
import { ErrorHandler } from './middlewares/error-handler'
import { Request, Response, NextFunction } from 'express'
// 注意导入的先后顺序，会影响执行的先后
import { ResDataFormatInterceptor } from './interceptors/res-data-format'　// 后执行
import { FormatMongoInterceptor } from './interceptors/format-mongo' // 先执行
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
        FormatMongoInterceptor,
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


