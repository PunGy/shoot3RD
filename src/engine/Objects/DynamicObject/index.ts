import { BaseObject } from '@engine/Objects/BaseObject'
import { Direction } from '@src/examples/panzers/utils/calcMovement'

export interface DynamicObject
{
    speed: number;
    direction: Direction;
    colliderClasses: Array<string>;
    collidingEvents: Record<string, <O extends BaseObject, T extends BaseObject>(thisObject: O, collidedObject: T) => void>;
}
