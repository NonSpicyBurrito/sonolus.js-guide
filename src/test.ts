import { Code, Multiply, visualize } from 'sonolus.js'

function calculateCircleArea(radius: Code<number>) {
    return Multiply(Math.PI, radius, radius)
}

console.log(visualize(calculateCircleArea(5)))
