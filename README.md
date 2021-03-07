# Ch.18 Input Buckets

In this chapter, we will set up input buckets for notes.

## Input Buckets

Input buckets are categories of notes which notes can feed judgment distance values into, and at the result screen a probability graph will be shown for each bucket.

While it's not necessary, it is very useful for players to calibrate their input offset or improve on their accuracy.

## Setup Buckets

Our engine only has one type of note, so one bucket will do.

At the result screen each bucket will be represented by a graphic composed of skin sprites, so we should make it as close to the in game visual of the note as possible.

```ts
// src/engine/data/buckets.ts

export const buckets = defineBuckets({
    note: {
        sprites: [
            {
                id: SkinSprite.NoteHeadCyan,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: 0,
            },
        ],
    },
})
```

What bucket value to report is up to the engine, however it is mostly commonly the timing difference in ms.

In initialization script we set up the bucket windows.

```ts
// src/engine/data/scripts/initialization.ts

const preprocess = [
    // ...
    LevelBucket.of(buckets.noteIndex).setBucket(50, 100, 200),
]
```

## Bucket and Bucket Value

Similar to how we tell Sonolus about judgment result, we write to Entity Input block for bucket and bucket value in note script.

```ts
// src/engine/data/scripts/note.ts

const touch = And(
    // ...
    [
        // ...
        InputBucket.set(buckets.noteIndex + 1),
        InputBucketValue.set(
            Multiply(
                1000,
                Subtract(TouchST, DeviceInputOffset, EntityData.time)
            )
        ),
    ]
)
```
