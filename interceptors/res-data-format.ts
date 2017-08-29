import { Interceptor, InterceptorInterface, Action } from 'routing-controllers'

@Interceptor()
export class ResDataFormatInterceptor implements InterceptorInterface {
    intercept (action: Action, content: any) {
        console.log('nice!!', content)
        return {
            code: 200,
            msg: '请求成功',
            data: content
        }
    }
}