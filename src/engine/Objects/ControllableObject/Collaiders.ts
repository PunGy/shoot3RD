import type { ControllableObject } from './index'
import type { BaseObject } from '@engine/Objects/BaseObject'
import type { Coordinate } from '@src/utils/calcMovement'
import GameProcess from '@engine/GameProcess'

export const getObjectOnPixel = (x: number, y: number) =>
{
    const objects = GameProcess.getObjects()
    return objects.some(({ x: objX, y: objY, width, height }) => (
        (x >= objX && x <= objX + width)
        && (y >= objY && y <= objY + height)
    ))
}


export type Collider = (obj: ControllableObject & BaseObject, nextCoordinate: Coordinate) => boolean

export const worldBoundariesCollider: Collider = (activeObject, nextCoordinate) =>
{
    const { x, y } = nextCoordinate

    const okayY = y >= 0 && y + activeObject.height <= GameProcess.mapHeight
    const okayX = x >= 0 && x + activeObject.width <= GameProcess.mapWidth

    return okayY && okayX
}

export const classesCollider: Collider = (activeObject, nextCoordinate) =>
{
    if (activeObject.colliderClasses == null) return true

    const { x, y } = nextCoordinate
    const { width, height } = activeObject

    const objects = GameProcess.getObjects()

    return !objects.some((obj) => (
        activeObject.colliderClasses.includes(obj.class) && (
            (x >= obj.x) && (x <= obj.x + obj.width)
            || (x + width >= obj.x) && (x + width <= obj.x + obj.width)
        ) && (
            (y >= obj.y) && (y <= obj.y + obj.height)
            || (y + height >= obj.y) && (y + height <= obj.y + obj.height)
        )
    ))
}
