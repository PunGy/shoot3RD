import RenderPrimitives from './RenderPrimitives'
import BaseObject from '@engine/Objects/BaseObject'
import { once } from '@src/utils/once'

export default class Render
{
    static canvasEl: HTMLCanvasElement
    static ctx: CanvasRenderingContext2D
    static renderPrimitives: RenderPrimitives

    /**
     * Initialize render
     * Cannot be called more than once!
     */
    static initialize = once(() =>
    {
        if (
            Render.canvasEl !== undefined
            || Render.ctx !== undefined
        ) throw new Error('Render is already initialized!')

        Render.canvasEl = document.getElementById('world') as HTMLCanvasElement
        Render.ctx = Render.canvasEl.getContext('2d')
        Render.renderPrimitives = new RenderPrimitives(Render.ctx)

        const { innerWidth, innerHeight } = window
        Render.canvasEl.width = innerWidth
        Render.canvasEl.height = innerHeight
    })

    static draw(object: BaseObject)
    {
        if (typeof object.texture === 'function')
        {
            object.texture(object, Render.ctx)
        }
    }
}
