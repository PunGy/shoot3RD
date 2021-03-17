export default class World
{
    public ctx: CanvasRenderingContext2D
    public canvasEl: HTMLCanvasElement

    constructor()
    {
        this.canvasEl = document.getElementById('world') as HTMLCanvasElement
        this.ctx = this.canvasEl.getContext('2d')

        const { innerWidth, innerHeight } = window
        this.canvasEl.width = innerWidth
        this.canvasEl.height = innerHeight
    }

    public rect(x: number, y: number, size: number, color: string)
    {
        const { ctx } = this
        const prevStyle = ctx.fillStyle

        ctx.fillStyle = color
        ctx.fillRect(x, y, size, size)

        ctx.fillStyle = prevStyle
    }
}