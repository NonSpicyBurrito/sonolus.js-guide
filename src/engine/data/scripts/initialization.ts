import {
    HorizontalAlign,
    ScreenAspectRatio,
    SScript,
    Subtract,
    UIMenu,
    VerticalAlign,
} from 'sonolus.js'

export function initialization(): SScript {
    const preprocess = UIMenu.set(
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
    )

    return {
        preprocess: {
            code: preprocess,
        },
    }
}
