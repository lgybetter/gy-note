import { Interceptor, InterceptorInterface, Action } from 'routing-controllers'
import { mongoIdToWebId } from '../utils/filters'
import { ResData } from '../interfaces/res-data'

@Interceptor()
export class FormatMongoInterceptor implements InterceptorInterface {
    intercept (action: Action, content: ResData ) {
        console.log('wow mongo', content.data)
        if(content.data.map)　{
            console.log('oh, array')
            return {
                code: content.code,
                msg: content.msg,
                data: content.data.map(mongoIdToWebId)
            }
        }
        return {
            code: content.code,
            msg: content.msg,
            data: mongoIdToWebId(content.data)
        }
    }
}