import { BaseFn } from './baseFn'

export const every = <Args>(...functions: Array<BaseFn<Args, boolean>>) => (
    (...args: Array<Args>) => functions.every((fn) => fn(...args))
)
