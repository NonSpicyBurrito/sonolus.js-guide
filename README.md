# Ch.11 Stage

In this chapter, we will setup stage script and entity which draws our stage.

## Setup

Let's first create `src/engine/data/scripts/stage.ts` that exports an empty script.

```ts
// src/engine/data/scripts/stage.ts

export function stage(): SScript {
    return {}
}
```

Add it to our list of scripts.

```ts
// src/engine/data/scripts/index.ts

export const scripts = defineScripts({
    // ...
    stage,
})
```

Add an archetype that uses that script.

```ts
// src/engine/data/archetypes.ts

export const archetypes = defineArchetypes({
    // ...
    stage: {
        script: scripts.stageIndex,
    },
})
```

And lastly add an entity that uses the archetype.

```ts
// src/level/data/index.ts

export const levelData: SLevelData = {
    entities: [
        // ...
        {
            archetype: archetypes.stageIndex,
        },
    ],
}
```

## Spawning

Stage entity should spawn after initialization entity and after initialization entity has despawned.

We can let its `spawnOrder` callback return a value higher than the one of initialization entity, in this case we simply use `1`.

```ts
// src/engine/data/scripts/stage.ts

const spawnOrder = 1

return {
    spawnOrder: {
        code: spawnOrder,
    },
}
```

To only spawn after initialization entity has despawned, we can check Entity Info of entity `0`, and only return `true` in `shouldSpawn` when its state equals to despawned.

```ts
// src/engine/data/scripts/stage.ts

const shouldSpawn = Equal(EntityInfo.of(0).state, State.Despawned)

return {
    // ...
    shouldSpawn: {
        code: shouldSpawn,
    },
}
```

## Screen Coordinate System

Sonolus uses a screen coordinate system where `(0, 0)` lies on center of the screen, with `y` goes from `-1` (bottom) to `1` (top), and `x` goes from `-1 * ScreenAspectRatio` (left) to `ScreenAspectRatio` (right).

## Draw Judgment Line

Our stage is simple: just one judgment line to let player know to tap when note falls to it.

We decide that the judgment line centers at `y = -0.6` with a thickness of `0.1`.

Let's first calculate the relevant variables we need.

```ts
// src/engine/data/scripts/stage.ts

const yCenter = -0.6
const thickness = 0.1

const left = Multiply(-1, ScreenAspectRatio)
const right = ScreenAspectRatio

const top = yCenter + thickness / 2
const bottom = yCenter - thickness / 2
```

Next we will draw it in `updateParallel` callback.

```ts
// src/engine/data/scripts/stage.ts

const updateParallel = Draw(
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
    1
)

return {
    // ...
    updateParallel: {
        code: updateParallel,
    },
}
```
