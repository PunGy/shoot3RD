export default class RenderImage
{
    private ctx: CanvasRenderingContext2D

    constructor(ctx: CanvasRenderingContext2D)
    {
        this.ctx = ctx
    }

    static createImage = (src: string) => new Promise<HTMLImageElement>(
        (res) =>
        {

            const img = new Image()
            img.src = src

            img.onload = () => res(img)
        },
    )
}