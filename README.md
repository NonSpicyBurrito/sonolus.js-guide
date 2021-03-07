# Ch.10 Initialization Script

In this chapter, we will go over the concept of initialization script pattern and apply it to our engine.

## Initialization Script Pattern

It is common for a level to have some global values that need to be calculated and made available to other scripts to use.

An example could be the stage area may change depending on screen aspect ratio, and rather than calculate it every time we need it, we can calculate it once and store it in a global block such as Level Memory.

The initialization script pattern is made for achieving such a goal: an entity with the initialization script will always be the first and only entity to spawn and does initialization work for however long it sees fit. Other entities will only spawn once the initialization entity has despawned.

## Setting up Initialization Pattern

Believe it or not, we already have most of the initialization pattern set up.

You may have already noticed we named our script `initialization.ts` when we restructured our project, and we already have an entity with an archetype with the initialization script.

Next is to set up its spawning logic, its initialization workload, and despawn logic.

## Spawning Logic

The spawning logic for our initialization entity is rather simple: we just need to ensure it's the first to spawn and spawn right away.

To make it the first to spawn, we simply need to make its `spawnOrder` callback to return a value that's lower than any other entities' values.

In our case, we are simply going to use `0`.

```ts
// src/engine/data/scripts/initialization.ts

const spawnOrder = 0

return {
    // ...
    spawnOrder: {
        code: spawnOrder,
    },
}
```

## Initialization Workload

Initialization workload can be put anywhere in the lifecycle of the entity, typically in `updateSequential` callback.

For our engine in this guide, we don't have any initialization workload to perform. However for demonstration purpose, let's `DebugLog` a value.

```ts
// src/engine/data/scripts/initialization.ts

const updateSequential = DebugLog(42)

return {
    // ...
    updateSequential: {
        code: updateSequential,
    },
}
```

## Despawning

Despawning the initialization entity is the same as despawaning any other entity: by returning a truthy value from either `updateSequential` or `updateParallel`, the entity will be scheduled to despawn at the end of current frame.

In our case since we already have code in `updateSequential`, we can simply modify it to return `true` to achieve despawning.

```ts
// src/engine/data/scripts/initialization.ts

const updateSequential = [DebugLog(42), true]
```

## Testing

To test that we correctly implemented the initialization pattern, we can turn on Debug Mode in Sonolus settings, and try the test level to see if debug data in the bottom-right corner is indeed showing `42`.
