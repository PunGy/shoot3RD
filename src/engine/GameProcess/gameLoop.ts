import Render from '@engine/Render'
import { BaseObject } from '@engine/Objects/BaseObject'
import { BackgroundImage } from '@engine/GameProcess'

function gameLoopFn(objects: Map<string, BaseObject>, backgroundImage?: BackgroundImage)
{
    Render.drawBackground(backgroundImage)
    objects.forEach(Render.draw)
}

export default gameLoopFn
