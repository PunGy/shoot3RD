import DefaultTexture from '@resources/images/blocks/question.png'

export interface BaseObject
{
    x: number;
    y: number;

    width: number;
    height: number;

    texture: string | ((object: this, ctx: CanvasRenderingContext2D) => void);
}

export const baseObjectDefaultValues: BaseObject = {
    x: 0,
    y: 0,

    width: 100,
    height: 100,

    texture: DefaultTexture,
}