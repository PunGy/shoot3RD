import BackgroundImg from './resources/images/background/background.png'
import GameProcess from '@engine/GameProcess'
// eslint-disable-next-line import/order
import { CreatePanzer } from './objects/panzer'

export async function start()
{
    GameProcess.initialize({ keydownType: 'nodelayOne', mapHeight: 600, mapWidth: 600 })

    const player = CreatePanzer({ x: 0, y: 0, arbiter: 'player' })
    player.focus()

    const enemies = Array.from({ length: 5 }, (_, i) => CreatePanzer({ x: (i + 1) * 50, y: 0, arbiter: 'AI' }))

    await GameProcess.registerObject(player)
    await Promise.all(enemies.map((enemy) => GameProcess.registerObject(enemy)))

    await GameProcess.setBackgroundImage({
        src: BackgroundImg,
        splineSize: 50,
    })

    GameProcess.startGame()
}
