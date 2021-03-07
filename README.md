# Ch.17 Input Judgment

In this chapter, we will set up input judgment for notes.

## Input Archetype

You may have already noticed, despite our notes being fully functional, Sonolus doesn't treat them like so: you can skip the entire level right away, and at the result screen it shows you 0 notes for all the statistics.

In order for an entity to be considered as a playable note by Sonolus, it's archetype must have `input` set to `true`.

```ts
// src/engine/data/archetype.ts

export const archetypes = defineArchetypes({
    // ...
    note: {
        script: scripts.noteIndex,
        input: true,
    },
})
```

With that set:

-   Sonolus will know and count all the entities with an archetype that accepts input.
-   Only when all input entities are despawned, will player allow to skip rest of the level.
-   Input entity gets access to Entity Input block, which script can use to tell Sonolus how the player did.
-   Sonolus will automatically calculate statistics like score, combo, Perfect count, etc based on input results.
-   Related UI are also updated and animated when a new input result comes in.
-   Input results that specified buckets will also get judgment graphs at the result screen.

## Input Judgment

To tell Sonolus how the player did on a note, we simply modify values in Entity Input block.

For `InputJudgment`, we can manually assign `0` (Miss), `1` (Perfect), `2` (Great), or `3` (Good). However, the better way is to simply use `Judge` function.

Remember to take into account input offset.

```ts
// src/engine/data/scripts/note.ts

const touch = And(
    // ...
    [
        // ...
        InputJudgment.set(
            Judge(
                Subtract(TouchST, DeviceInputOffset),
                EntityData.time,
                0.05,
                0.1,
                0.2
            )
        ),
    ]
)
```

## Judgment and Combo UI

It's also important to have judgment and combo UI to give player instant feedback while playing.

We set them up in our initialization script.

```ts
// src/engine/data/scripts/initialization.ts

const preprocess = [
    // ...
    UIJudgment.set(
        0,
        -0.4,
        0.5,
        0,
        0.8,
        0.2,
        0,
        1,
        HorizontalAlign.Center,
        VerticalAlign.Middle,
        false
    ),
    UIComboValue.set(
        Multiply(ScreenAspectRatio, 0.7),
        0,
        0.5,
        0,
        0.5,
        0.25,
        0,
        1,
        HorizontalAlign.Center,
        VerticalAlign.Middle,
        false
    ),
    UIComboText.set(
        Multiply(ScreenAspectRatio, 0.7),
        0,
        0.5,
        1,
        0.5,
        0.15,
        0,
        1,
        HorizontalAlign.Center,
        VerticalAlign.Middle,
        false
    ),
]
```
