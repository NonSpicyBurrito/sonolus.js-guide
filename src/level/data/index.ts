import { SLevelData } from 'sonolus.js'

import { archetypes } from '../../engine/data/archetypes'

export const levelData: SLevelData = {
    entities: [
        {
            archetype: archetypes.initializationIndex,
        },
        {
            archetype: archetypes.stageIndex,
        },
        {
            archetype: archetypes.noteIndex,
            data: {
                index: 0,
                values: [2],
            },
        },
    ],
}
