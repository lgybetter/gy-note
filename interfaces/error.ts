export interface IError extends Error {
    code: number,
    msg: string
}