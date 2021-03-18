import GameProcess from '@engine/GameProcess'
import BaseObject from '@src/engine/Objects/BaseObject'
import Render from '@src/engine/Render'

GameProcess.initialize()
GameProcess.registerObject(
    new BaseObject({
        x: 0,
        y: 0,
        height: 100,
        width: 200,
        texture: (object) =>
        {
            Render.renderPrimitives.rect(object.x, object.y, object.width, object.height, 'red')
        },
    }),
)