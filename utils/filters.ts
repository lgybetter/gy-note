import { DocumentQuery } from 'mongoose'

export const mongoIdToWebId = (entity: any) => {
    let object = undefined
    if(entity.toObject) {
        object = entity.toObject()
        object.id = object._id.toString()
    } else {
        object = JSON.parse(JSON.stringify(entity))
        object.id = object._id
    }
    delete object._id
    delete object.__v
    return object
}