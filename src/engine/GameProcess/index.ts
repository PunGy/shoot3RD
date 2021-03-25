import gameLoopFn from './gameLoop'
import { BaseObject } from '@engine/Objects/BaseObject'
import Render from '@engine/Render'
import { once } from '@src/utils/once'
import RenderImage from '@src/engine/Render/RenderImage'
import { Keycode } from '@src/engine/Objects/ControllableObject'

export type State = 'play'|'menu'
export interface BackgroundImage {
    src: string;
    splineSize: number;
    img: HTMLImageElement;
}
export type keyAction = () => void

type keydownEventListener = (ev: WindowEventMap['keydown']|HTMLElementEventMap['keydown']) => void
const nodelayKeydown = <T extends {
    addEventListener: (
        type: 'keydown'|'keyup',
        listener: keydownEventListener,
    ) => void;
}>(elem: T, listener: keydownEventListener, repeatSpeed = 70) =>
{
    const intervalIds: Record<string, number> = {}
    elem.addEventListener('keydown', (event) =>
    {
        if (intervalIds[event.code] == null)
        {
            intervalIds[event.code] = (setInterval as Window['setInterval'])(() => listener(event), repeatSpeed)
        }
    })
    elem.addEventListener('keyup', ({ code }) =>
    {
        if (intervalIds[code] != null)
        {
            clearInterval(intervalIds[code])
            delete intervalIds[code]
        }
    })
}

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

    static initialize = once(() =>
    {
        Render.initialize()
        nodelayKeydown(window, ({ code }) =>
        {
            GameProcess.KeymapBindings[code as Keycode]()
        })
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
