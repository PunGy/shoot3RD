import { Direction } from '@src/examples/panzers/utils/calcMovement'
import { Panzer, PANZER_CLASS } from '@src/examples/panzers/objects/panzer'
import { ObjectBuilder } from '@engine/Objects/ObjectBuilder'
import { BaseObject } from '@engine/Objects/BaseObject'
import { DynamicObject } from '@engine/Objects/DynamicObject'
import { isIntersection } from '@src/utils/base/isIntersection'
import GameProcess from '@engine/GameProcess'
import { GlobalVariables } from '@src/examples/panzers/types'

interface BulletProperties {
    victimClasses: Array<string>;
    attackerId: string;
}
export type BulletConfig = BulletProperties
    & Pick<BaseObject, 'x'|'y'>
    & Pick<DynamicObject, 'direction'>

export const BULLET_SIZE = {
    height: 10,
    width: 5,
}

export type Bullet = BaseObject & DynamicObject & BulletConfig

export const createBullet = ({ x, y, direction, ...other }: BulletConfig) => (
    ObjectBuilder({
        x,
        y,
        width: BULLET_SIZE.width,
        height: BULLET_SIZE.height,
        classes: ['bullet'],
    })
        .makeDynamic({
            direction,
            collidingEvents: {
                [PANZER_CLASS]: (thisBullet: Bullet, panzer: Panzer) =>
                {
                    if (isIntersection(panzer.classes, thisBullet.victimClasses))
                    {
                        GameProcess.destroyObject(panzer, 'killed')
                        GameProcess.setGlobalVariables<GlobalVariables>({
                            score: GameProcess.getGlobalVariables<GlobalVariables>().score + 1,
                        })

                    }
                },
            },
        })
        .addCustomProps(other)
)
