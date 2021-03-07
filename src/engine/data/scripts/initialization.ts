import {
    HorizontalAlign,
    LevelBucket,
    Multiply,
    ScreenAspectRatio,
    SScript,
    Subtract,
    UIComboText,
    UIComboValue,
    UIJudgment,
    UIMenu,
    VerticalAlign,
} from 'sonolus.js'

import { buckets } from '../buckets'

export function initialization(): SScript {
    const preprocess = [
        UIMenu.set(
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
        UIJudgment.set(
            0,
            -0.4,
            0.5,
            0,
            0.8,
            0.2,
            0,
            1,
            HorizontalAlign.Center,
            VerticalAlign.Middle,
            false
        ),
        UIComboValue.set(
            Multiply(ScreenAspectRatio, 0.7),
            0,
            0.5,
            0,
            0.5,
            0.25,
            0,
            1,
            HorizontalAlign.Center,
            VerticalAlign.Middle,
            false
        ),
        UIComboText.set(
            Multiply(ScreenAspectRatio, 0.7),
            0,
            0.5,
            1,
            0.5,
            0.15,
            0,
            1,
            HorizontalAlign.Center,
            VerticalAlign.Middle,
            false
        ),

        LevelBucket.of(buckets.noteIndex).setBucket(50, 100, 200),
    ]

    const spawnOrder = 0

    const updateSequential = true

    return {
        preprocess: {
            code: preprocess,
        },
        spawnOrder: {
            code: spawnOrder,
        },
        updateSequential: {
            code: updateSequential,
        },
    }
}
