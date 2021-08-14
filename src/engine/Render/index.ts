import RenderPrimitives from './RenderPrimitives'
import type { BaseObject } from '@engine/Objects/BaseObject'
import { once } from '@src/utils/once'
import type { GameProcessInitializeConfig, BackgroundImage } from '@src/engine/GameProcess'
import RenderImage from '@src/engine/Render/RenderImage'


export default class Render
{
    static canvasEl: HTMLCanvasElement
    static ctx: CanvasRenderingContext2D
    static renderPrimitives: RenderPrimitives
    static renderImage: RenderImage

    /**
     * Initialize render
     */
    static initialize = once(({ mapWidth, mapHeight }: GameProcessInitializeConfig) =>
    {
        Render.canvasEl = document.getElementById('world') as HTMLCanvasElement
        Render.ctx = Render.canvasEl.getContext('2d')

        Render.renderPrimitives = new RenderPrimitives(Render.ctx)
        Render.renderImage = new RenderImage(Render.ctx)

        const { innerWidth, innerHeight } = window
        Render.canvasEl.width = mapWidth ?? innerWidth
        Render.canvasEl.height = mapHeight ?? innerHeight
    })

    static draw(object: BaseObject)
    {
        if (typeof object.texture === 'function')
        {
            object.texture(object, Render.ctx)
            return
        }

        Render.ctx.drawImage(
            Render.renderImage.getImageFromCache(object.texture),
            object.x,
            object.y,
            object.width,
            object.height,
        )
    }

    static drawBackground(backgroundImage?: BackgroundImage)
    {
        if (backgroundImage)
        {
            const { splineSize, img } = backgroundImage
            const splineCountX = Math.ceil(window.innerWidth / splineSize)
            const splineCountY = Math.ceil(window.innerHeight / splineSize)

            for (let iY = 0; iY < splineCountY; iY++)
                for (let iX = 0; iX < splineCountX; iX++)
                    Render.ctx.drawImage(
                        img,
                        iX * splineSize,
                        iY * splineSize,
                        splineSize,
                        splineSize,
                    )
        }
    }
}
