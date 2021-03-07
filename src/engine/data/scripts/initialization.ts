import {
    ArchetypeLife,
    ConsecutiveGreatScore,
    ConsecutivePerfectLife,
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
    UILifeBar,
    UILifeValue,
    UIMenu,
    UIScoreBar,
    UIScoreValue,
    VerticalAlign,
} from 'sonolus.js'

import { archetypes } from '../archetypes'
import { buckets } from '../buckets'

export function initialization(): SScript {
    const noteLife = ArchetypeLife.of(archetypes.noteIndex)

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
        UILifeBar.set(
            Subtract(0.25, ScreenAspectRatio),
            0.95,
            0,
            1,
            0.6,
            0.15,
            0,
            1,
            HorizontalAlign.Left,
            VerticalAlign.Middle,
            true
        ),
        UILifeValue.set(
            Subtract(0.4, ScreenAspectRatio),
            0.95,
            0,
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

        noteLife.perfectLifeIncrement.set(10),
        noteLife.missLifeIncrement.set(-100),

        ConsecutivePerfectLife.set(50, 10),
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
