export default class RenderPrimitives
{
    private ctx: CanvasRenderingContext2D

    constructor(ctx: CanvasRenderingContext2D)
    {
        this.ctx = ctx
    }

    rect(x: number, y: number, width: number, height: number, color: string)
    {
        const { ctx } = this
        const prevStyle = ctx.fillStyle

        ctx.fillStyle = color
        ctx.fillRect(x, y, width, height)

        ctx.fillStyle = prevStyle
    }
}