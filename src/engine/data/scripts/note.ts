import {
    Add,
    createEntityData,
    Draw,
    EntityMemory,
    GreaterOr,
    Pointer,
    Remap,
    SkinSprite,
    SScript,
    Subtract,
    Time,
} from 'sonolus.js'

class EntityDataPointer extends Pointer {
    public get time() {
        return this.to<number>(0)
    }

    public get spawnTime() {
        return this.to<number>(1)
    }

    public get z() {
        return this.to<number>(2)
    }
}

const EntityData = createEntityData(EntityDataPointer)

export function note(): SScript {
    const preprocess = [
        EntityData.spawnTime.set(Subtract(EntityData.time, 1)),
        EntityData.z.set(Subtract(1000, EntityData.time)),
    ]

    const spawnOrder = Add(EntityData.spawnTime, 1000)

    const shouldSpawn = GreaterOr(Time, EntityData.spawnTime)

    const radius = 0.2
    const yFrom = 1 + radius
    const yTo = -0.6

    const yCurrent = EntityMemory.to<number>(0)

    const left = -radius
    const right = radius
    const top = Add(yCurrent, radius)
    const bottom = Subtract(yCurrent, radius)

    const updateParallel = [
        yCurrent.set(
            Remap(EntityData.spawnTime, EntityData.time, yFrom, yTo, Time)
        ),
        Draw(
            SkinSprite.NoteHeadCyan,
            left,
            bottom,
            left,
            top,
            right,
            top,
            right,
            bottom,
            EntityData.z,
            1
        ),
    ]

    return {
        preprocess: {
            code: preprocess,
        },
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
