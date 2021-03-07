# Ch.15 Note Input

In this chapter, we will add input functionality to note.

## Basic Input

Let's first do the very basic input: if player taps, note despawns.

We reserve a value in Entity Memory for our input state (in this case, a `boolean` to represent tapped or not). When `touch` is called, we set it to `true`. In `updateParallel` if we detect input state to be `true`, we can then skip drawing and despawn by returning `true`.

```ts
// src/engine/data/scripts/note.ts

const inputState = EntityMemory.to<boolean>(1)

const touch = And(TouchStarted, inputState.set(true))

const updateParallel = Or(inputState, [
    // ...
])

return {
    // ...
    touch: {
        code: touch,
    },
    // ...
}
```

(Note: here we use `Or` and short circuit evaluation as a shorthand. If `inputState` is `true`, then `Or` immediately returns `true` which despawns and skips rest of the conditions)

## Judgment Windows

While it works now, it definitely isn't the way rhythm games work normally.

A note can only be tapped when it's in its judgment window: if it's too early, tapping won't trigger it; if it's too late, it's considered a Miss and the note will despawn by itself.

For our engine, let's say if you tap within 50 ms of the correct time you get a Perfect, 100 ms for Great, 200 ms for Good, and anything higher is considered not registered/Miss.

## Input Offset

When player physically touches the screen, there is a delay until it registers in Sonolus and broadcasts it via `touch` callback. This mostly comes from hardware delay and is unavoidable.

Input offset is what allows players to tell Sonolus to take that into account.

For example, player touches the screen at `00:01.00`, it takes some time and it reaches at `00:01.06`. If player calibrates their input correctly and gives you an input offset of `0.06`, engine can then subtract it from touch time, and correctly judge player based on their real touch time.

Device input offset is offered in Level Data block, and you can simply accessing it with `DeviceInputOffset`. It is important to take it into account to give players the best experience.

## Early Input

Let's first calculate the earliest time player can tap.

As usual, it is an intrinsic and unchanging property of the note, so we calculate it once in `preprocess` and store it in Entity Data for later reuse.

```ts
// src/engine/data/scripts/note.ts

class EntityDataPointer extends Pointer {
    // ...
    public get minInputTime() {
        return this.to<number>(3)
    }
}

const preprocess = [
    // ...
    EntityData.minInputTime.set(Add(EntityData.time, -0.2, DeviceInputOffset)),
]
```

Now let's make it so that tap would only be accepted if it's touched after the minimum input time.

```ts
// src/engine/data/scripts/note.ts

const touch = And(
    // ...
    GreaterOr(TouchST, EntityData.minInputTime)
    // ...
)
```

## Late Input

Similar to above, let's calculate the latest time player can tap.

```ts
// src/engine/data/scripts/note.ts

class EntityDataPointer extends Pointer {
    // ...
    public get maxInputTime() {
        return this.to<number>(4)
    }
}

const preprocess = [
    // ...
    EntityData.maxInputTime.set(Add(EntityData.time, 0.2, DeviceInputOffset)),
]
```

Let's make note despawn automatically if time is already past maximum input time.

```ts
// src/engine/data/scripts/note.ts

const updateParallel = Or(
    // ...
    Greater(Time, EntityData.maxInputTime),
    [
        // ...
    ]
)
```

## Input Blocking

There's is one last thing to do: when two notes are very close to each other and player taps, we only want the tap to be registered on one note not both.

We can achieve this by using Temporary Data block. It is available during `touch` callback and gets reset on every touch.

We can use 0th value for whether this touch is occupied or not. If it is we don't process the current touch, if it isn't we process it and set it to be occupied.

```ts
// src/engine/data/scripts/note.ts

const isTouchOccupied = TemporaryMemory.to<boolean>(0)

const touch = And(
    // ...
    Not(isTouchOccupied),
    [
        // ...
        isTouchOccupied.set(true),
    ]
)
```
