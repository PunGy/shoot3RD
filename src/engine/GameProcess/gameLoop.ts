import { ObjectsMap } from './index'
import Render from '@src/engine/Render'

function gameLoopFn({
    dynamicObjects,
    staticObjects,
}: ObjectsMap)
{
    staticObjects.forEach((obj) =>
    {
        if (obj.needRender)
        {
            Render.draw(obj)
            obj.needRender = false
        }
    })
    dynamicObjects.forEach(Render.draw)
}

export default gameLoopFn