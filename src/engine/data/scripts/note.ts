import {
    Add,
    And,
    createEntityData,
    DeviceInputOffset,
    Divide,
    Draw,
    EntityMemory,
    Greater,
    GreaterOr,
    If,
    InputBucket,
    InputBucketValue,
    InputJudgment,
    Judge,
    Multiply,
    Not,
    Or,
    ParticleEffect,
    Play,
    Pointer,
    Random,
    Remap,
    SkinSprite,
    SpawnParticleEffect,
    SScript,
    Subtract,
    TemporaryMemory,
    Time,
    TouchST,
    TouchStarted,
} from 'sonolus.js'

import { options } from '../../configuration/options'
import { buckets } from '../buckets'

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

    public get minInputTime() {
        return this.to<number>(3)
    }

    public get maxInputTime() {
        return this.to<number>(4)
    }
}

const EntityData = createEntityData(EntityDataPointer)

export function note(): SScript {
    const preprocess = [
        EntityData.time.set(Divide(EntityData.time, options.speed)),
        EntityData.spawnTime.set(
            Subtract(EntityData.time, If(options.random, Random(0.5, 1.5), 1))
        ),
        EntityData.z.set(Subtract(1000, EntityData.time)),
        EntityData.minInputTime.set(
            Add(EntityData.time, -0.2, DeviceInputOffset)
        ),
        EntityData.maxInputTime.set(
            Add(EntityData.time, 0.2, DeviceInputOffset)
        ),
    ]

    const spawnOrder = Add(EntityData.spawnTime, 1000)

    const shouldSpawn = GreaterOr(Time, EntityData.spawnTime)

    const inputState = EntityMemory.to<boolean>(1)

    const isTouchOccupied = TemporaryMemory.to<boolean>(0)

    const touch = And(
        TouchStarted,
        GreaterOr(TouchST, EntityData.minInputTime),
        Not(isTouchOccupied),
        [
            inputState.set(true),
            isTouchOccupied.set(true),
            InputJudgment.set(
                Judge(
                    Subtract(TouchST, DeviceInputOffset),
                    EntityData.time,
                    0.05,
                    0.1,
                    0.2
                )
            ),
            InputBucket.set(buckets.noteIndex + 1),
            InputBucketValue.set(
                Multiply(
                    1000,
                    Subtract(TouchST, DeviceInputOffset, EntityData.time)
                )
            ),
            Play(InputJudgment, 0.02),
            SpawnParticleEffect(
                ParticleEffect.NoteCircularTapCyan,
                -0.4,
                -1,
                -0.4,
                -0.2,
                0.4,
                -0.2,
                0.4,
                -1,
                0.3,
                false
            ),
        ]
    )

    const radius = 0.2
    const yFrom = 1 + radius
    const yTo = -0.6

    const yCurrent = EntityMemory.to<number>(0)

    const left = -radius
    const right = radius
    const top = Add(yCurrent, radius)
    const bottom = Subtract(yCurrent, radius)

    const updateParallel = Or(
        inputState,
        Greater(Time, EntityData.maxInputTime),
        [
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
    )

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
        touch: {
            code: touch,
        },
        updateParallel: {
            code: updateParallel,
        },
    }
}
