export const mapObject = <TKey extends string|number|symbol, TVal, TRes>(
    obj: Record<TKey, TVal>,
    mapFn: (val: TVal, key: TKey, obj: Record<TKey, TVal>) => TRes,
): Record<TKey, TRes> =>
{
    const newObj = {} as Record<TKey, TRes>

    for (const key in obj)
    {
        if (Object.prototype.hasOwnProperty.call(obj, key))
            newObj[key] = mapFn(obj[key], key, obj)
    }

    return newObj
}

