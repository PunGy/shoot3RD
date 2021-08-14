import gameLoopFn from './gameLoop'
import { BaseObject } from '@engine/Objects/BaseObject'
import Render from '@engine/Render'
import { once } from '@src/utils/once'
import RenderImage from '@src/engine/Render/RenderImage'
import { Keycode } from '@src/engine/Objects/ControllableObject'
import { nodelayKeydown } from '@engine/GameProcess/keydownHandlers'

export type State = 'play'|'menu'
export interface BackgroundImage {
    src: string;
    splineSize: number;
    img: HTMLImageElement;
}
export type keyAction = () => void

const codes: Array<Keycode> = [
    Keycode.W,
    Keycode.A,
    Keycode.S,
    Keycode.D,
    Keycode.Escape,
    Keycode.ArrowUp,
    Keycode.ArrowLeft,
    Keycode.ArrowDown,
    Keycode.ArrowRight,
]

export interface GameProcessInitializeConfig {
    mapWidth?: number;
    mapHeight?: number;
    keydownType?: 'nodelayMulti' | 'nodelayOne' | 'defaultWeb';
}

export default class GameProcess
{
    private static objects: Array<BaseObject> = []
    private static backgroundImage?: BackgroundImage

    private static state: State = 'play'
    private static readonly fps = 20
    private static readonly fpsInterval = 1000 / GameProcess.fps

    private static KeymapBindings = codes.reduce(
        (keymap, keycode) => ({ ...keymap, [keycode]: (): void => null }),
        {} as Record<Keycode, keyAction>,
    )

    private static gameLoopFn = gameLoopFn

    static mapWidth: number
    static mapHeight: number

    static keydownType: 'nodelayMulti' | 'nodelayOne' | 'defaultWeb'

    static initialize = once(({ keydownType = 'nodelayMulti', mapWidth, mapHeight }: GameProcessInitializeConfig) =>
    {
        Render.initialize({ mapWidth, mapHeight })

        GameProcess.mapHeight = mapHeight
        GameProcess.mapWidth = mapWidth
        GameProcess.keydownType = keydownType

        const listener = ({ code }: KeyboardEvent) =>
        {
            const handler = GameProcess.KeymapBindings[code as Keycode]
            if (handler) handler()
        }

        if (GameProcess.keydownType === 'defaultWeb')
            window.addEventListener('keydown', listener)
        else
            nodelayKeydown(window, listener, GameProcess.keydownType === 'nodelayMulti' ? 'multiple' : 'one')
    })

    static startGame()
    {
        GameProcess.state = 'play'

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

    static async registerObject<O extends BaseObject>(object: O)
    {
        if (typeof object.texture === 'string')
            await Render.renderImage.cacheImage(object.texture)
        GameProcess.objects.push(object)
    }

    static async setBackgroundImage(imageConfig: Omit<BackgroundImage, 'img'>)
    {
        const img = await RenderImage.createImage(imageConfig.src)

        GameProcess.backgroundImage = { ...imageConfig, img }
    }

    static setKeymap(keymap: Record<number, keyAction>)
    {
        Object.assign(GameProcess.KeymapBindings, keymap)
    }
}
