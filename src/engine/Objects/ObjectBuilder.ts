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
                obj.angle = direction === Direction.Up
                    ? 0
                    : direction === Direction.Right
                        ? 90
                        : direction === Direction.Down
                            ? 180
                            : direction === Direction.Left
                                ? 240
                                : 0
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
