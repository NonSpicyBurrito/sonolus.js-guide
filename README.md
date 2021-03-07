# Ch.22 Options

In this chapter, we will add additional options to make our engine more versatile.

## Speed

One of the most used option in rhythm game is variable speed, it gives player the ability to speed up/slow down a level to make it more challenging/easier to practice with.

Let's first add the option to our engine options.

```ts
// src/engine/configuration/options.ts

export const options = defineOptions({
    speed: {
        name: '#SPEED',
        standard: true,
        type: 'slider',
        def: 1,
        min: 0.5,
        max: 2,
        step: 0.05,
        display: 'percentage',
    },
})
```

Here `#SPEED` is a special option name that Sonolus understands and will adjust level bgm accordingly.

We can now change speed to 200% and level bgm will play at that speed, however our notes are out of sync now.

To fix it, we simply need to shift note time according to the level speed.

```ts
// src/engine/data/scripts/note.ts

const preprocess = [
    EntityData.time.set(Divide(EntityData.time, options.speed)),
    // ...
]
```

## Random

Random is also a common option where level is altered randomly which makes each play of the same level a different experience.

```ts
// src/engine/configuration/options.ts

export const options = defineOptions({
    // ...
    random: {
        name: '#RANDOM',
        standard: true,
        type: 'toggle',
        def: 0,
    },
})
```

For our engine, we are going to randomize the amount of time it takes for the note to fall.

```ts
// src/engine/data/scripts/note.ts

const preprocess = [
    // ...
    EntityData.spawnTime.set(
        Subtract(EntityData.time, If(random, Random(0.5, 1.5), 1))
    ),
    // ...
]
```
