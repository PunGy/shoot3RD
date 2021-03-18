import gameLoopFn from './gameLoop'
import DynamicObject from '@engine/Objects/DynamicObject'
import BaseObject from '@engine/Objects/BaseObject'
import Render from '@engine/Render'
import { once } from '@src/utils/once'

export interface ObjectsMap {
    staticObjects: Array<BaseObject>;
    dynamicObjects: Array<DynamicObject>;
}

export type State = 'play'|'menu'

export default class GameProcess
{
    private static isPlay = false
    private static objects: ObjectsMap = {
        staticObjects: [],
        dynamicObjects: [],
    }
    private static state: State = 'play'
    private static readonly fps = 20
    private static readonly fpsInterval = 1000 / GameProcess.fps

    private static gameLoopFn = gameLoopFn

    static initialize = once(() =>
    {
        Render.initialize()

        GameProcess.startGame()
    })

    static startGame()
    {
        if (GameProcess.state === 'play')
        {
            let prevTime = performance.now()
            window.requestAnimationFrame(function loop(time)
            {
                if (time - prevTime > GameProcess.fpsInterval)
                {
                    prevTime = time
                    GameProcess.gameLoopFn(GameProcess.objects)
                }

                if (GameProcess.state === 'play') window.requestAnimationFrame(loop)
            })
        }
    }

    static registerObject<O extends BaseObject>(object: O)
    {
        if (object instanceof BaseObject)
            GameProcess.objects.staticObjects.push(object)
        else
            GameProcess.objects.dynamicObjects.push(object)
    }
}