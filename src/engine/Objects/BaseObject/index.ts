export interface BaseObjectConstructor
{
    x: number;
    y: number;

    width: number;
    height: number;

    texture: string | ((object: this, ctx: CanvasRenderingContext2D) => void);
}

export default class BaseObject implements BaseObjectConstructor
{
    constructor(initialValues: BaseObjectConstructor)
    {
        Object.assign(this, initialValues)
    }
    x: number
    y: number

    width: number
    height: number

    texture: string | ((object: this, ctx: CanvasRenderingContext2D) => void)
    needRender = true
}
