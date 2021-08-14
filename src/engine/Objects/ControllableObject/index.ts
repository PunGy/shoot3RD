import GameProcess from '@src/engine/GameProcess'
import type { BaseObject } from '@src/engine/Objects/BaseObject'
import { calcMovement, Coordinate, Direction } from '@src/utils/calcMovement'
import { mapObject } from '@src/utils/mapObject'

export enum Keycode {
    W = 'KeyW',
    A = 'KeyA',
    S = 'KeyS',
    D = 'KeyD',
    Escape = 'Escape',

    ArrowLeft = 'ArrowLeft',
    ArrowUp = 'ArrowUp',
    ArrowRight = 'ArrowRight',
    ArrowDown = 'ArrowDown',
}


export interface ControllableObject
{
    _type: 'controllable';
    focus: () => void;

    onMove?: (obj: ControllableObject & BaseObject, direction: Direction, nextCoordinate: Coordinate) => void;
    // based on preMove decides move or not further on nextCoordinate
    preMove?: (obj: ControllableObject & BaseObject, nextCoordinate: Coordinate) => boolean;

    speed: number; // in pixels/sec
    direction: Direction;
    keymap: { [key in Keycode]?: Direction };
}

export const worldBoundariesCollider = (obj: ControllableObject & BaseObject, nextCoordinate: Coordinate): boolean => {
    const { x, y } = nextCoordinate

    const okayY = y >= 0 && y + obj.height <= GameProcess.mapHeight
    const okayX = x >= 0 && x + obj.width <= GameProcess.mapWidth

    return okayY && okayX
}

export const controllableObjectDefaults: ControllableObject = {
    _type: 'controllable',

    focus()
    {
        const { keymap, speed, onMove, preMove } = this as ControllableObject

        GameProcess.setKeymap(mapObject(
            keymap as Record<Keycode, Direction>, (direction) => (
                () =>
                {
                    const nextCoordinate = calcMovement(this as BaseObject, direction, speed)

                    if (preMove != null && !preMove(this, nextCoordinate)) return

                    if (onMove) onMove(this, direction, nextCoordinate)
                    this.direction = direction
                    Object.assign(this, nextCoordinate)
                }
            )),
        )
    },

    preMove: worldBoundariesCollider,
    speed: 10,
    direction: Direction.Up,
    keymap: {
        [Keycode.ArrowUp]: Direction.Up,
        [Keycode.ArrowLeft]: Direction.Left,
        [Keycode.ArrowDown]: Direction.Down,
        [Keycode.ArrowRight]: Direction.Right,
    },
}
