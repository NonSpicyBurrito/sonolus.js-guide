import { emptyDirSync, outputFileSync } from 'fs-extra'

import { buildOutput } from '.'

const distPath = 'dist'

emptyDirSync(distPath)

outputFileSync(
    `${distPath}/EngineConfiguration-${buildOutput.engine.configuration.hash}`,
    buildOutput.engine.configuration.buffer
)

outputFileSync(
    `${distPath}/EngineData-${buildOutput.engine.data.hash}`,
    buildOutput.engine.data.buffer
)

outputFileSync(
    `${distPath}/LevelData-${buildOutput.level.data.hash}`,
    buildOutput.level.data.buffer
)
