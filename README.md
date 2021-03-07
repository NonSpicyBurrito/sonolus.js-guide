# Ch.12 Responding to Touch Events

In this chapter, we will improve stage script to draw judgment line at different opacity responding to touch events.

## `touch` Callback

For each point of contact player touches the screen, a touch event will be broadcasted. Entities can receive them using `touch` callback.

In `touch` callback, Temporary Data and Temporary Memory block are also available, and touch related information is stored in Temporary Data block which you can access using various imports.

To quickly try it out, let's make our stage script `DebugLog` the touch starting time when a touch starts.

```ts
// src/engine/data/scripts/stage.ts

const touch = And(TouchStarted, DebugLog(TouchST))

return {
    // ...
    touch: {
        code: touch,
    },
    // ...
}
```

(Note: here we use `And` as a shorthand for `If` without false branch)

## Storing Value in Entity Memory Block

Our drawing logic is in `updateParallel` callback, however we can only know touch information in `touch` callback, how do we pass data from one to another?

We can using Entity Memory block to store and share data.

We are going to use 0th value in Entity Memory block as whether there is any touch event, so we first obtain a pointer to it.

```ts
// src/engine/data/scripts/stage.ts

const anyTouch = EntityMemory.to<boolean>(0)
```

Next whenever `touch` callback is called, we check if the touch is ended, if not then we set `anyTouch` to `true`.

```ts
// src/engine/data/scripts/stage.ts

const touch = Or(TouchEnded, anyTouch.set(true))
```

(Note: here we use `Or` as a shorthand for `If` without true branch)

Lastly, we `DebugLog` it and reset it to `false` at the end of each frame in `updateParallel`.

```ts
// src/engine/data/scripts/stage.ts

const updateParallel = [
    DebugLog(anyTouch),
    // ...
    anyTouch.set(false),
]
```

Now if we test the level, we can see debug value changed to `1` whenever a touch is held, and back to `0` when released.

## Improve Judgment Line

To make use of it, let's change our judgment line drawing to draw at `100%` opacity when there is a touch, and `50%` when there isn't.

```ts
// src/engine/data/scripts/stage.ts

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
```
