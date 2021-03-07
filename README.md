# Ch.16 Test Level

In this chapter, we will set up a simple level to better play test with.

## Level Cover and Bgm

You can specify level cover and level bgm of development server using the `serverConfig` parameter of `serve` function.

It also allows you to serve a static folder at `/static` so you can test local resources.

In this guide, we are simply going to use online bgm and cover for testing purpose.

```ts
// src/serve.ts

serve(buildOutput, {
    levelCover: {
        type: 'LevelCover',
        url: 'https://sonolus.com/assets/jacket066.png',
    },
    levelBgm: {
        type: 'LevelBgm',
        url: 'https://sonolus.com/assets/bgm066.mp3',
    },
})
```

## Chart

We are also going to use a chart for the level, it's simply raw times of notes in a text file.

In level data we are going to parse it and convert it into entities.

```ts
// src/level/data/index.ts

export const levelData: SLevelData = {
    entities: [
        // ...
        ...readFileSync(__dirname + '/chart.txt', 'utf-8')
            .split('\n')
            .map((time) => ({
                archetype: archetypes.noteIndex,
                data: {
                    index: 0,
                    values: [+time],
                },
            })),
    ],
}
```

If you have trouble understanding it there's no sweat, it's only for testing purpose.
