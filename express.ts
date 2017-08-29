import 'reflect-metadata'
import { createExpressServer, useContainer, useExpressServer, Controller, UseBefore } from 'routing-controllers';
import { Container } from 'typedi'
import Controllers from './controllers'
import { LogUrlMidd } from './middlewares/log-url-midd'
import { Request, Response, NextFunction } from 'express'
import { port, host } from './config'

useContainer(Container)

const expressApp = createExpressServer({
    controllers: Controllers,
    middlewares: [
        LogUrlMidd
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


