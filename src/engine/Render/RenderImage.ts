export default class RenderImage
{
    private ctx: CanvasRenderingContext2D
    private imageCache: Record<string, HTMLImageElement> = {}


    constructor(ctx: CanvasRenderingContext2D)
    {
        this.ctx = ctx
    }

    public async cacheImage(src: string)
    {
        const image = await RenderImage.createImage(src)
        this.imageCache[src] = image
    }
    public getImageFromCache(src: string)
    {
        return this.imageCache[src]
    }

    static createImage (src: string)
    {
        return new Promise<HTMLImageElement>(
            (res) =>
            {

                const img = new Image()
                img.src = src

                img.onload = () => res(img)
            },
        )
    }
}