import { defineOptions } from 'sonolus.js'

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
    random: {
        name: '#RANDOM',
        standard: true,
        type: 'toggle',
        def: 0,
    },
})
