import gameLoopFn from './gameLoop'
import BaseObject from '@engine/Objects/BaseObject'
import Render from '@engine/Render'
import { once } from '@src/utils/once'

export type State = 'play'|'menu'

export default class GameProcess
{
    private static objects: Array<BaseObject> = []
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
        GameProcess.objects.push(object)
    }
}