import gameLoopFn from './gameLoop'
import { BaseObject } from '@engine/Objects/BaseObject'
import Render from '@engine/Render'
import { once } from '@src/utils/base/once'
import RenderImage from '@src/engine/Render/RenderImage'
import { nodelayKeydown } from '@engine/GameProcess/keydownHandlers'

export type State = 'play'|'menu'
export interface BackgroundImage {
    src: string;
    splineSize: number;
    img: HTMLImageElement;
}
export type KeyAction = () => void

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

export type Keymap = Record<Keycode, KeyAction>

export interface GameProcessInitializeConfig {
    mapWidth?: number;
    mapHeight?: number;
    keydownType?: 'nodelayMulti' | 'nodelayOne' | 'defaultWeb';

    globalVariables?: Record<string, any>;
}

export default class GameProcess
{
    private static objects: Map<string, BaseObject> = new Map()
    private static backgroundImage?: BackgroundImage

    private static state: State = 'play'
    private static readonly fps = 20
    private static readonly fpsInterval = 1000 / GameProcess.fps
    private static objectsId = 0

    private static KeymapBindings: Keymap = codes.reduce(
        (keymap, keycode) => ({ ...keymap, [keycode]: (): void => null }),
        {} as Keymap,
    )

    private static gameLoopFn = gameLoopFn

    static mapWidth: number
    static mapHeight: number

    static keydownType: 'nodelayMulti' | 'nodelayOne' | 'defaultWeb'

    private static globalVariables: Record<string, unknown>

    static initialize = once(({ keydownType = 'nodelayMulti', mapWidth, mapHeight, globalVariables }: GameProcessInitializeConfig) =>
    {
        Render.initialize({ mapWidth, mapHeight })

        GameProcess.mapHeight = mapHeight
        GameProcess.mapWidth = mapWidth
        GameProcess.keydownType = keydownType
        GameProcess.globalVariables = globalVariables

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
        if (object.id == null) object.id = (++GameProcess.objectsId).toString()
        GameProcess.objects.set(object.id, object)
    }

    static destroyObject<O extends BaseObject>(object: O, reason?: string)
    {
        GameProcess.objects.delete(object.id)
        if (object.onDestroy) object.onDestroy(reason)
    }

    static getObjects()
    {
        return Array.from(GameProcess.objects.values())
    }

    static async setBackgroundImage(imageConfig: Omit<BackgroundImage, 'img'>)
    {
        const img = await RenderImage.createImage(imageConfig.src)

        GameProcess.backgroundImage = { ...imageConfig, img }
    }

    static setKeymap(keymap: Keymap)
    {
        Object.assign(GameProcess.KeymapBindings, keymap)
    }

    static getGlobalVariables<G extends Record<string, any>>()
    {
        return GameProcess.globalVariables as G
    }
    static setGlobalVariables<G extends Record<string, any>>(newState: Partial<G>)
    {
        return Object.assign(GameProcess.globalVariables, newState)
    }
}
