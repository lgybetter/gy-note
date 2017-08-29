export interface ResData {
    code: number,
    msg: string
    data: any
}

export interface IError extends ResData, Error {
}
