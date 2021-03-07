# Ch.14 Note Drawing

In this chapter, we will draw the note at the correct position based on time.

## Drawing

Let's say our note should have a radius of `0.2`, starts falling from just outside the screen at note spawn time, and reaches the center of judgment line at note time.

Let's first set up the constants.

```ts
// src/engine/data/scripts/note.ts

const radius = 0.2
const yFrom = 1 + radius
const yTo = -0.6
```

With those, we can calculate the current y position based on current time with some simple math, or in this case we are going to use a convenient function `Remap` to do it.

Since we are going to use this y position 4 times in `Draw` function, we should save it to a value in Entity Memory to avoid repeated calculations.

```ts
// src/engine/data/scripts/note.ts

const yCurrent = EntityMemory.to<number>(0)

const updateParallel = [
    yCurrent.set(
        Remap(EntityData.spawnTime, EntityData.time, yFrom, yTo, Time)
    ),
]

return {
    // ...
    updateParallel: {
        code: updateParallel,
    },
}
```

And finally with the current y position calculated, we can draw a note at that position.

```ts
// src/engine/data/scripts/note.ts

const left = -radius
const right = radius
const top = Add(yCurrent, radius)
const bottom = Subtract(yCurrent, radius)

const updateParallel = [
    // ...
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
        1000,
        1
    ),
]
```

## Z Fighting

While this is working already, there is a hidden issue we have not solve yet: z fighting.

It is referred to when multiple objects are rendered with the same z value, their ordering may not be consistent from frame to frame and can be problematic if they overlap.

To solve this, let's set the z order to be 1000 minus note time, so that earlier notes will always be on top of later notes.

This is also an intrinsic and unchanging property of the note, so we should calculate it once, store it in Entity Data, and reuse it as well instead of calculating it on every `Draw`.

```ts
// src/engine/data/scripts/note.ts

class EntityDataPointer extends Pointer {
    // ...
    public get z() {
        return this.to<number>(2)
    }
}

const preprocess = [
    // ...
    EntityData.z.set(Subtract(1000, EntityData.time)),
]

const updateParallel = [
    // ...
    Draw(
        // ...
        EntityData.z
        // ...
    ),
]
```
