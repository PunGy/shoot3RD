import GameProcess from '@engine/GameProcess'
// import { BaseObject } from '@engine/Objects/BaseObject'
// import Render from '@engine/Render'
import BackgroundImg from '@resources/images/background/background-grass.png'
import { ObjectBuilder } from '@src/engine/Objects/ObjectBuilder'


async function start()
{
    GameProcess.initialize()

    const obj = ObjectBuilder()
        .makeControllable({ speed: 30 })
        .complete()
    obj.focus()

    await GameProcess.registerObject(obj)

    await GameProcess.setBackgroundImage({
        src: BackgroundImg,
        splineSize: 100,
    })

    GameProcess.startGame()
}

start()
