# Ch.06 Setting up Development Server

For rest of the guide, we will be creating a one-lane-tap-only rhythm game engine, as well as a level to go along with it, as a real world example.

In this chapter, we will go over setting up development server using Sonolus.js.

## Required Resources

The primary purpose of Sonolus.js is for developing engines, so its development server requires Engine Configuration and Engine Data, as well as Level Data for a test level.

## Engine Configuration

For now, we don't need any options.

```ts
// src/test.ts

const engineConfiguration: SEngineConfiguration = {
    options: [],
}
```

## Engine Data

For now, we have only one script which simply sets up UI Menu in preprocess so we can exit, and we have only one archetype of that script.

```ts
// src/test.ts

const engineData: SEngineData = {
    buckets: [],
    archetypes: [
        {
            script: 0,
        },
    ],
    scripts: [
        {
            preprocess: {
                code: UIMenu.set(
                    Subtract(0.05, ScreenAspectRatio),
                    0.95,
                    0,
                    1,
                    0.15,
                    0.15,
                    0,
                    1,
                    HorizontalAlign.Center,
                    VerticalAlign.Middle,
                    true
                ),
            },
        },
    ],
}
```

## Level Data

For now, we have only one entity of that archetype.

```ts
// src/test.ts

const levelData: SLevelData = {
    entities: [
        {
            archetype: 0,
        },
    ],
}
```

## Building

With these information, we can call `build` to build them into formats Sonolus can understand.

```ts
// src/test.ts

const buildOutput = build({
    engine: {
        configuration: engineConfiguration,
        data: engineData,
    },

    level: {
        data: levelData,
    },
})
```

## Serving

Finally we can serve it with a development server by calling `serve`

```ts
// src/test.ts

serve(buildOutput)
```

Try connecting to one of the addresses listed using Sonolus app and if it works, we are ready to develop our engine!
