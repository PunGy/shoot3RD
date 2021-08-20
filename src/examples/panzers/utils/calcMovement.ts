export enum Direction {
    Left,
    Right,
    Up,
    Down
}
export type Coordinate = { x: number; y: number; }

export const calcMovement = (initialCoordinates: Coordinate, direction: Direction, step: number): Coordinate =>
{
    const { x: ix, y: iy } = initialCoordinates

    switch (direction)
    {
    case Direction.Up: return { x: ix, y: iy - step }
    case Direction.Left: return { x: ix - step, y: iy }
    case Direction.Down: return { x: ix, y: iy + step }
    case Direction.Right: return { x: ix + step, y: iy }
    }
}