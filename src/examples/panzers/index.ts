import BackgroundImg from './resources/images/background/floor.png'
import GameProcess from '@engine/GameProcess'
// eslint-disable-next-line import/order
import { Arbiter, CreatePanzer, PANZER_SIZE } from './objects/panzer'
import { randomInt } from '@src/utils/base/randomInt'
import { GlobalVariables } from '@src/examples/panzers/types'

const mapHeight = 600
const mapWidth = 600

const initialEnemiesCount = 5

export async function start()
{
    const globalVariables: GlobalVariables = {
        score: 0,
    }
    GameProcess.initialize({ keydownType: 'nodelayOne', mapHeight, mapWidth, globalVariables })

    const player = CreatePanzer({ x: 0, y: 0, arbiter: Arbiter.Player })
    player.focus()

    const enemies = Array.from({ length: initialEnemiesCount }, (_, i) => CreatePanzer({
        x: mapWidth / (initialEnemiesCount / (i + 1)), y: randomInt(0, mapHeight - PANZER_SIZE), arbiter: Arbiter.AI,
    }))

    await GameProcess.registerObject(player)
    await Promise.all(enemies.map((enemy) => GameProcess.registerObject(enemy)))

    await GameProcess.setBackgroundImage({
        src: BackgroundImg,
        splineSize: 100,
    })

    GameProcess.startGame()
}
