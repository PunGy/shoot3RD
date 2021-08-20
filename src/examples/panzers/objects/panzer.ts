import EnemyPanzer from '../resources/images/panzers/enemy.png'
import PlayerPanzer from '../resources/images/panzers/player.png'
import { ObjectBuilder } from '@engine/Objects/ObjectBuilder'
import { BaseObject } from '@engine/Objects/BaseObject'
import { ControllableObject } from '@engine/Objects/ControllableObject'
import { calcMovement, Direction } from '@src/examples/panzers/utils/calcMovement'
import { DynamicObject } from '@engine/Objects/DynamicObject'

export enum Arbiter {
    Player = 'player',
    AI = 'AI',
}

export interface PanzerConfig {
    x: number;
    y: number;

    arbiter: Arbiter;
}

export type Panzer = BaseObject & DynamicObject & ControllableObject & PanzerConfig

export const PANZER_SPEED = 10
export const PANZER_SIZE = 40

export const PANZER_CLASS = 'panzer'

const move = (nextDirection: Direction, obj: BaseObject & DynamicObject) =>
{
    const nextCoordinate = calcMovement(panzer, nextDirection, panzer.speed)
}

export const CreatePanzer = ({ x, y, arbiter }: PanzerConfig): Panzer => (
    ObjectBuilder(
        {
            x,
            y,
            classes: [PANZER_CLASS, arbiter],
            width: PANZER_SIZE,
            height: PANZER_SIZE,
            texture: arbiter === Arbiter.Player ? PlayerPanzer : EnemyPanzer,
        },
    )
        .makeDynamic({
            speed: PANZER_SPEED,
            colliderClasses: [PANZER_CLASS],
        })
        .makeControllable({
            keymap: [

            ],
        })
        .addCustomProps({
            arbiter,
        })
        .complete()
)
