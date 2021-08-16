import { BaseFn } from './baseFn'

export const compose = <A, B, C>(fn1: (arg: B) => C, fn0: BaseFn<A, B>) => (
    (...args: Array<A>) => fn1(fn0(...args))
)
