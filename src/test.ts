import { bool, DebugLog, If, visualize } from 'sonolus.js'

console.log(visualize(If(bool(5), DebugLog(true), DebugLog(false))))
