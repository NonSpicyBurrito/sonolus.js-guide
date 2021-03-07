# Ch.19 Score

In this chapter, we will set up score and score UI.

## Judgment Type Score Multiplier

Each judgment type can have their own score multipliers, typically set to `1` for Perfect and lower for Great and Good.

```ts
// src/engine/data/scripts/initialization.ts

const preprocess = [
    // ...
    PerfectMultiplier.set(1),
    GreatMultiplier.set(0.75),
    GoodMultiplier.set(0.5),
]
```

## Consecutive Judgment Type Score Multiplier

Consecutive judgment type score multiplier refers to score multiplier that accumulates as you hit with equal or higher than the target judgment.

To explain with an example, we are going to set the consecutive Great score multiplier to accumulate `0.01` every `10`, capped at `50`. That means for every 10 consecutive Greats you hit, you get `0.01` additional score multiplier, up to `50` consecutive Greats (so you can get up to `0.05` increased score)

```ts
// src/engine/data/scripts/initialization.ts

const preprocess = [
    // ...
    ConsecutiveGreatScore.set(0.01, 10, 50),
]
```

## Score UI

There are score bar and score value for displaying score. Score bar shows a progress bar showing percentage of the max score, while score value shows the raw score value.

It is recommended to stack them on top of each other to show both information at once.

```ts
// src/engine/data/scripts/initialization.ts

const preprocess = [
    // ...
    UIScoreBar.set(
        Subtract(ScreenAspectRatio, 0.05),
        0.95,
        1,
        1,
        0.6,
        0.15,
        0,
        1,
        HorizontalAlign.Left,
        VerticalAlign.Middle,
        true
    ),
    UIScoreValue.set(
        Subtract(ScreenAspectRatio, 0.05),
        0.95,
        1,
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
