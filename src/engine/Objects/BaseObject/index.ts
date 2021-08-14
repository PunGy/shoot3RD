import DefaultTexture from '@resources/images/blocks/question.png'

export interface BaseObject
{
    class?: string;
    id?: string;

    x: number;
    y: number;

    width: number;
    height: number;
    angle: number;

    texture: string | ((object: this, ctx: CanvasRenderingContext2D) => void);
}

export const baseObjectDefaultValues: BaseObject = {
    x: 0,
    y: 0,

    width: 100,
    height: 100,
    angle: 0,

    texture: DefaultTexture,
}
