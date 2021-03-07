import { serve } from 'sonolus.js'

import { buildOutput } from '.'

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
