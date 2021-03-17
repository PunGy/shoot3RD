export default class Render
{
    static canvasEl: HTMLCanvasElement
    static ctx: CanvasRenderingContext2D

    /**
     * Initialize render
     * Cannot be called more than once!
     */
    static initialize()
    {
        if (
            Render.canvasEl !== undefined
            || Render.ctx !== undefined
        ) throw new Error('Render is already initialized!')

        Render.canvasEl = document.getElementById('world') as HTMLCanvasElement
        Render.ctx = Render.canvasEl.getContext('2d')

        const { innerWidth, innerHeight } = window
        this.canvasEl.width = innerWidth
        this.canvasEl.height = innerHeight
    }

    static rect(x: number, y: number, size: number, color: string)
    {
        const { ctx } = this
        const prevStyle = ctx.fillStyle

        ctx.fillStyle = color
        ctx.fillRect(x, y, size, size)

        ctx.fillStyle = prevStyle
    }
}
