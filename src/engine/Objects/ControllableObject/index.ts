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

    ArrowLeft = 'ArrowUp',
    ArrowUp = 'ArrowLeft',
    ArrowRight = 'ArrowDown',
    ArrowDown = 'ArrowRight',
}

export interface ControllableObject
{
    _type: 'controllable';
    focus: () => void;

    onMove?: (obj: ControllableObject & BaseObject, direction: Direction, nextCoordinate: Coordinate) => void;

    speed: number; // in pixels/sec
    direction: Direction;
    keymap: { [key in Keycode]?: Direction };
}

export const controllableObjectDefaults: ControllableObject = {
    _type: 'controllable',

    focus()
    {
        const { keymap, speed, onMove } = this as ControllableObject

        GameProcess.setKeymap(mapObject(
            keymap as Record<Keycode, Direction>, (direction) => (
                () =>
                {
                    const nextCoordinate = calcMovement(this as BaseObject, direction, speed)
                    this.direction = direction
                    if (onMove) onMove(this, direction, nextCoordinate)
                    Object.assign(this, nextCoordinate)
                }
            )),
        )
    },

    speed: 10,
    direction: Direction.Up,
    keymap: {
        [Keycode.W]: Direction.Up,
        [Keycode.A]: Direction.Left,
        [Keycode.S]: Direction.Down,
        [Keycode.D]: Direction.Right,
    },
}
