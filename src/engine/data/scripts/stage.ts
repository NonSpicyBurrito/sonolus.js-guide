import {
    Draw,
    EntityInfo,
    EntityMemory,
    Equal,
    If,
    Multiply,
    Or,
    ScreenAspectRatio,
    SkinSprite,
    SScript,
    State,
    TouchEnded,
} from 'sonolus.js'

export function stage(): SScript {
    const spawnOrder = 1

    const shouldSpawn = Equal(EntityInfo.of(0).state, State.Despawned)

    const anyTouch = EntityMemory.to<boolean>(0)

    const touch = Or(TouchEnded, anyTouch.set(true))

    const yCenter = -0.6
    const thickness = 0.1

    const left = Multiply(-1, ScreenAspectRatio)
    const right = ScreenAspectRatio

    const top = yCenter + thickness / 2
    const bottom = yCenter - thickness / 2

    const updateParallel = [
        Draw(
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
            If(anyTouch, 1, 0.5)
        ),
        anyTouch.set(false),
    ]

    return {
        spawnOrder: {
            code: spawnOrder,
        },
        shouldSpawn: {
            code: shouldSpawn,
        },
        touch: {
            code: touch,
        },
        updateParallel: {
            code: updateParallel,
        },
    }
}
