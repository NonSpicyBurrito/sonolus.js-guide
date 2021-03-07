# Ch.13 Note and Entity Data

In this chapter, we will setup a basic note script and look at how to integrate Entity Data into it.

## Setup

Same as before, let's setup the note script.

```ts
// src/engine/data/scripts/note.ts

export function note(): SScript {
    return {}
}
```

```ts
// src/engine/data/scripts/index.ts

export const scripts = defineScripts({
    // ...
    note,
})
```

```ts
// src/engine/data/archetypes.ts

export const archetypes = defineArchetypes({
    // ...
    note: {
        script: scripts.noteIndex,
    },
})
```

```ts
// src/level/data/index.ts

export const levelData: SLevelData = {
    entities: [
        // ...
        {
            archetype: archetypes.noteIndex,
        },
    ],
}
```

## Using Entity Data

Until now we only have initialization and stage, both should behave the same across all levels.

However that is not the case for notes: in one level maybe the first note at 5 second mark, while in another level it could be at 2; one level could have 200 notes, while another could have 30.

How would engine be able to handle various amount of notes with different information provided by the level?

That's where Entity Data comes into play. Each level can specify all the entities and also inject data into them.

Let's define that the 0th value of Entity Data of note archetype stores the time of the note.

If the level wants the note to have `2` as its time, it can simply inject it.

```ts
// src/level/data/index.ts

export const levelData: SLevelData = {
    entities: [
        // ...
        {
            archetype: archetypes.noteIndex,
            data: {
                index: 0,
                values: [2],
            },
        },
    ],
}
```

In order for our note data script to read injected Entity Data, we can create a binding class for it with helpers to simplify our code, and pass it to `createEntityData`.

```ts
// src/engine/data/scripts/note.ts

class EntityDataPointer extends Pointer {
    public get time() {
        return this.to<number>(0)
    }
}

const EntityData = createEntityData(EntityDataPointer)
```

To test it out, let's simply `DebugLog` our time.

```ts
// src/engine/data/scripts/note.ts

const updateParallel = DebugLog(EntityData.time)

return {
    updateParallel: {
        code: updateParallel,
    },
}
```

## Spawning Logic

Now that we know how to access data such as note's time, we can implement spawning logic to our notes.

Let's say we want the note to appear 1 second before the time, falls from top to bottom, so player has time to react to it. Then, the spawning logic should be: if the current level time is larger than note time minus 1, we spawn.

However, there is no reason to keep calculating "note time minus 1" over and over: it's an intrinsic property of the note and unchanging, we should simply calculate it once and store it for use later.

Let's expand our Entity Data binding to include a new field `spawnTime`.

```ts
// src/engine/data/scripts/note.ts

class EntityDataPointer extends Pointer {
    // ...
    public get spawnTime() {
        return this.to<number>(1)
    }
}
```

In `preprocess`, let's calculate `spawnTime` and save it for later use.

```ts
// src/engine/data/scripts/note.ts

const preprocess = EntityData.spawnTime.set(Subtract(EntityData.time, 1))

return {
    preprocess: {
        code: preprocess,
    },
}
```

For `spawnOrder`, we want our notes to spawn after stage, and should be ordered by their `spawnTime`: a note with spawn time at 2 second should spawn earlier than one at 5 second.

To achieve that, we can simply return `spawnTime` plus 1000.

```ts
// src/engine/data/scripts/note.ts

const spawnOrder = Add(EntityData.spawnTime, 1000)

return {
    // ...
    spawnOrder: {
        code: spawnOrder,
    },
}
```

For `shouldSpawn`, logic is as simply as check whether the current time is greater or equal to `spawnTime`.

```ts
// src/engine/data/scripts/note.ts

const shouldSpawn = GreaterOr(Time, EntityData.spawnTime)

return {
    // ...
    shouldSpawn: {
        code: shouldSpawn,
    },
}
```
