import type { ControllableObject } from './index'
import type { BaseObject } from '@engine/Objects/BaseObject'
import type { Coordinate } from '@src/examples/panzers/utils/calcMovement'
import GameProcess from '@engine/GameProcess'
import { isIntersection } from '@src/utils/base/isIntersection'

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
        isIntersection(activeObject.colliderClasses, obj.classes) && (
            x < obj.x + obj.width
            && x + width > obj.x
            && y < obj.y + obj.height
            && y + height > obj.y
        )
    ))
}
