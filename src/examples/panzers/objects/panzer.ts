import EnemyPanzer from '../resources/images/panzers/enemy.png'
import PlayerPanzer from '../resources/images/panzers/player.png'
import { ObjectBuilder } from '@engine/Objects/ObjectBuilder'

export enum Arbiter {
    Player = 'player',
    AI = 'AI',
}

export interface Panzer {
    x: number;
    y: number;

    arbiter: Arbiter;
}

export const PANZER_SPEED = 10
export const PANZER_SIZE = 40

export const CreatePanzer = ({ x, y, arbiter }: Panzer) => (
    ObjectBuilder(
        {
            x,
            y,
            class: arbiter,
            width: PANZER_SIZE,
            height: PANZER_SIZE,
            texture: arbiter === Arbiter.Player ? PlayerPanzer : EnemyPanzer,
        },
    )
        .makeControllable({
            speed: PANZER_SPEED,
            colliderClasses: [Arbiter.AI],
            rotateOnMove: true,
        })
        .complete()
)
