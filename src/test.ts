import {
    build,
    HorizontalAlign,
    ScreenAspectRatio,
    SEngineConfiguration,
    SEngineData,
    serve,
    SLevelData,
    Subtract,
    UIMenu,
    VerticalAlign,
} from 'sonolus.js'

const engineConfiguration: SEngineConfiguration = {
    options: [],
}

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

const levelData: SLevelData = {
    entities: [
        {
            archetype: 0,
        },
    ],
}

const buildOutput = build({
    engine: {
        configuration: engineConfiguration,
        data: engineData,
    },

    level: {
        data: levelData,
    },
})

serve(buildOutput)
