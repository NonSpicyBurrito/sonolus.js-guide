# Ch.21 SFX

In this chapter, we will add SFX to stage and notes.

## Note Judgment SFX

To add SFX on judgment, simple call `Play` with the desired effect clip.

Something to take note of is that, `1` is the value of `EffectClip.Perfect`, `2` is the value of `EffectClip.Great`, and `3` is the value of `EffectClip.Good`. These match up perfectly with `InputJudgment`, so you can simply pass that as the clip id.

```ts
// src/engine/data/scripts/note.ts

const touch = And(
    // ...
    [
        // ...
        Play(InputJudgment, 0.02),
    ]
)
```

## Stage SFX

Since we have judgment line react to tap already, it also makes sense to play SFX.

```ts
// src/engine/data/scripts/stage.ts

const touch = Or(TouchEnded, [
    // ...
    And(TouchStarted, Play(EffectClip.Stage, 0.02)),
])
```

## Remove SFX Clashing

An issue occurs: when we tap a note, both the judgment SFX and stage SFX play together and clash. Ideally we only want stage SFX to play when player isn't hitting a note.

This should be easy, we already have `isTouchOccupied` set to `true` if a touch is occupied, so we can check that and omit playing if `true`.

```ts
// src/engine/data/scripts/stage.ts

const isTouchOccupied = TemporaryMemory.to<boolean>(0)

const touch = Or(TouchEnded, [
    // ...
    And(TouchStarted, Not(isTouchOccupied), Play(EffectClip.Stage, 0.02)),
])
```

However that doesn't seem to work, both SFX still play.

The reason is that when `callback` order isn't specified, it will default to `0`. Since both stage and entity scripts' `touch` callbacks aren't specified, they both have order of `0` and since stage entity spawns earlier, its `callback` executes first and therefore `isTouchOccupied` is always `false`.

To fix it, simply set order higher so that stage `touch` callback executes later.

```ts
// src/engine/data/scripts/stage.ts

return {
    // ...
    touch: {
        // ...
        order: 1,
    },
    // ...
}
```
