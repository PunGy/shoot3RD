import Render from '@src/engine/Render'
import BaseObject from '@src/engine/Objects/BaseObject'

function gameLoopFn(objects: Array<BaseObject>)
{
    objects.forEach(Render.draw)
}

export default gameLoopFn