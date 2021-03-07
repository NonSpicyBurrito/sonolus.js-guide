# Ch.20 Life

In this chapter, we will set up life and life UI.

## Archetype Life Increment

For each archetype, we can reward or punish player for hitting a judgment type.

In our engine, we are going to reward player for hitting a Perfect by 10 life, and punish player for hitting a Miss by 100 life.

```ts
// src/engine/data/scripts/initialization.ts

const noteLife = ArchetypeLife.of(archetypes.noteIndex)

const preprocess = [
    // ...
    noteLife.perfectLifeIncrement.set(10),
    noteLife.missLifeIncrement.set(-100),
]
```

## Consecutive Judgment Type Life Increment

Similar to score, we can also reward or punish player for hitting consecutive judgment type or above.

In our engine, we are going to reward player for hitting 10 consecutive Perfects by 50 life.

```ts
// src/engine/data/scripts/initialization.ts

const preprocess = [
    // ...
    ConsecutivePerfectLife.set(50, 10),
]
```

## Life UI

Similar to score, there are also life bar and life value UI.

```ts
// src/engine/data/scripts/initialization.ts

const preprocess = [
    // ...
    UILifeBar.set(
        Subtract(0.25, ScreenAspectRatio),
        0.95,
        0,
        1,
        0.6,
        0.15,
        0,
        1,
        HorizontalAlign.Left,
        VerticalAlign.Middle,
        true
    ),
    UILifeValue.set(
        Subtract(0.4, ScreenAspectRatio),
        0.95,
        0,
        1,
        0.45,
        0.15,
        0,
        1,
        HorizontalAlign.Right,
        VerticalAlign.Middle,
        false
    ),
    // ...
]
```
