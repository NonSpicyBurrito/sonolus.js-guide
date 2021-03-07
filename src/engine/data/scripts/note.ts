import {
    Add,
    createEntityData,
    GreaterOr,
    Pointer,
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
}

const EntityData = createEntityData(EntityDataPointer)

export function note(): SScript {
    const preprocess = EntityData.spawnTime.set(Subtract(EntityData.time, 1))

    const spawnOrder = Add(EntityData.spawnTime, 1000)

    const shouldSpawn = GreaterOr(Time, EntityData.spawnTime)

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
    }
}
