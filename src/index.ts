import GameProcess from '@engine/GameProcess'
import BaseObject from '@engine/Objects/BaseObject'
import Render from '@engine/Render'
import BackgroundImg from '@resources/images/background/background-grass.png'

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
GameProcess.setBackgroundImage({
    src: BackgroundImg,
    splineSize: 100,
}).then(
    () =>
    {
        GameProcess.startGame()
    },
)