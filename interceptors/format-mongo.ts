import { Interceptor, InterceptorInterface, Action } from 'routing-controllers'
import { mongoIdToWebId } from '../utils/filters'

@Interceptor()
export class FormatMongoInterceptor implements InterceptorInterface {
    intercept (action: Action, content: any ) {
        console.log('wow mongo', content)
        if(content.map)　{
            return content.map(mongoIdToWebId)
        }
        return mongoIdToWebId(content)
    }
}