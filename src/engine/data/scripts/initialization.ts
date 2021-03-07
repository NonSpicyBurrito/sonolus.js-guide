import {
    ConsecutiveGreatScore,
    GoodMultiplier,
    GreatMultiplier,
    HorizontalAlign,
    LevelBucket,
    Multiply,
    PerfectMultiplier,
    ScreenAspectRatio,
    SScript,
    Subtract,
    UIComboText,
    UIComboValue,
    UIJudgment,
    UIMenu,
    UIScoreBar,
    UIScoreValue,
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

        LevelBucket.of(buckets.noteIndex).setBucket(50, 100, 200),

        PerfectMultiplier.set(1),
        GreatMultiplier.set(0.75),
        GoodMultiplier.set(0.5),

        ConsecutiveGreatScore.set(0.01, 10, 50),
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
