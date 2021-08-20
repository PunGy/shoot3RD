export const isIntersection = <T>(arr0: Array<T>, arr1: Array<T>) => (
    arr0.some((item) => arr1.includes(item))
)
