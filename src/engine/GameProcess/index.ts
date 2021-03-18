import gameLoopFn from './gameLoop'
import BaseObject from '@engine/Objects/BaseObject'
import Render from '@engine/Render'
import { once } from '@src/utils/once'
import RenderImage from '@src/engine/Render/RenderImage'

export type State = 'play'|'menu'
export interface BackgroundImage {
    src: string;
    splineSize: number;
    img: HTMLImageElement;
}

export default class GameProcess
{
    private static objects: Array<BaseObject> = []
    private static backgroundImage?: BackgroundImage

    private static state: State = 'play'
    private static readonly fps = 20
    private static readonly fpsInterval = 1000 / GameProcess.fps

    private static gameLoopFn = gameLoopFn

    static initialize = once(() =>
    {
        Render.initialize()
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
                    GameProcess.gameLoopFn(GameProcess.objects, GameProcess.backgroundImage)
                }

                if (GameProcess.state === 'play') window.requestAnimationFrame(loop)
            })
        }
    }

    static registerObject<O extends BaseObject>(object: O)
    {
        GameProcess.objects.push(object)
    }

    static async setBackgroundImage(imageConfig: Omit<BackgroundImage, 'img'>)
    {
        const img = await RenderImage.createImage(imageConfig.src)

        GameProcess.backgroundImage = { ...imageConfig, img }
    }
}