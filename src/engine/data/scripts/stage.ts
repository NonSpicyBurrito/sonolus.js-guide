import {
    Draw,
    EntityInfo,
    Equal,
    Multiply,
    ScreenAspectRatio,
    SkinSprite,
    SScript,
    State,
} from 'sonolus.js'

export function stage(): SScript {
    const spawnOrder = 1

    const shouldSpawn = Equal(EntityInfo.of(0).state, State.Despawned)

    const yCenter = -0.6
    const thickness = 0.1

    const left = Multiply(-1, ScreenAspectRatio)
    const right = ScreenAspectRatio

    const top = yCenter + thickness / 2
    const bottom = yCenter - thickness / 2

    const updateParallel = Draw(
        SkinSprite.JudgmentLine,
        left,
        bottom,
        left,
        top,
        right,
        top,
        right,
        bottom,
        0,
        1
    )

    return {
        spawnOrder: {
            code: spawnOrder,
        },
        shouldSpawn: {
            code: shouldSpawn,
        },
        updateParallel: {
            code: updateParallel,
        },
    }
}
