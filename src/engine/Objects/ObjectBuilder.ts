import { BaseObject, baseObjectDefaultValues } from './BaseObject'
import { ControllableObject, controllableObjectDefaults } from './ControllableObject'
import { DynamicObject } from './DynamicObject'

export interface ObjectBuilderInstance<ObjectType>
{
    resultObject: ObjectType;

    makeControllable: (controllableObjectConfig?: Partial<ControllableObject>) => (
        ObjectBuilderInstance<ObjectType & ControllableObject>
    );
    makeDynamic: (dynamicObjectConfig?: Partial<DynamicObject>) => (
        ObjectBuilderInstance<ObjectType & DynamicObject>
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
    makeControllable(config)
    {
        Object.assign(this.resultObject, controllableObjectDefaults, config)
        return this
    },

    complete()
    {
        return this.resultObject
    },
})
