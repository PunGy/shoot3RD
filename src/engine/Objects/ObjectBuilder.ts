import { BaseObject, baseObjectDefaultValues } from './BaseObject'
import { ControllableObject, controllableObjectDefaults } from './ControllableObject'
import { DynamicObject } from './DynamicObject'
import { Direction } from '@src/utils/calcMovement'

export interface ControllableConfig {
    rotateOnMove: boolean;
}

export interface ObjectBuilderInstance<ObjectType>
{
    resultObject: ObjectType;

    makeControllable: (controllableObjectConfig?: Partial<ControllableObject & ControllableConfig>) => (
        ObjectBuilderInstance<ObjectType & ControllableObject>
    );
    makeDynamic: (dynamicObjectConfig?: Partial<DynamicObject>) => (
        ObjectBuilderInstance<ObjectType & DynamicObject>
    );
    addCustomProps: <T extends Record<string, unknown>>(customProps: T) => (
        ObjectBuilderInstance<ObjectType & T>
    );

    complete: () => ObjectType;
}

const angleTable = new Map([
    [Direction.Up, 0],
    [Direction.Right, 90],
    [Direction.Down, 180],
    [Direction.Left, 240],
])

export const ObjectBuilder = (baseObjectConfig: Partial<BaseObject> = {}): ObjectBuilderInstance<BaseObject> => ({
    resultObject: { ...baseObjectDefaultValues, ...baseObjectConfig },

    makeDynamic(config)
    {
        Object.assign(this.resultObject, config)
        return this
    },
    makeControllable({ rotateOnMove, ...config })
    {
        Object.assign(this.resultObject, controllableObjectDefaults, config)
        if (rotateOnMove)
        {
            (this.resultObject as ControllableObject).onMove = (obj, direction, nextCoordinate) => {
                if (config.onMove) config.onMove(obj, direction, nextCoordinate)
                obj.angle = angleTable.get(direction)
            }
        }
        return this
    },
    addCustomProps<T extends Record<string, unknown>>(config: T)
    {
        Object.assign(this.resultObject, config)
        return this
    },

    complete()
    {
        return this.resultObject
    },
})
