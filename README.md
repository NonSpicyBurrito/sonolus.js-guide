# Ch.02 Nodes

In this chapter, we will go over the concept of nodes in Sonolus and how it relates to Sonolus.js.

## Nodes

A piece of code can be represented as an Abstract Syntax Tree (AST) which is made up of nodes.

For example, our code `Multiply(Math.PI, 5, 5)` can be represented as a root `Multiply` node with 3 children nodes `Math.PI`, `5`, and `5`.

In Sonolus, that would be represented as:

```json
[
    {
        "func": "Multiply",
        "args": [1, 2, 3]
    },
    {
        "value": 3.141592653589793
    },
    {
        "value": 5
    },
    {
        "value": 5
    }
]
```

Notice that in Sonolus, ASTs are flattened - that is, rather than a nested tree structure it is only one in depth, and nodes reference each other using their indexes in this flattened array.

Here, `Multiply` node is a function node, it has 3 arguments: 1, 2, and 3, which are indexes that point to the (zero-based) 1st, 2nd, and 3rd node in the array, which are `3.14...`, `5`, and `5`, which are value nodes.

## Sonolus.js as Node Authoring

With the understanding of ASTs and nodes, you can guess that `Multiply` doesn't really do the multiplying, but rather creates an AST:

```ts
// src/test.ts

console.log(Multiply(Math.PI, 5, 5))

// Result:
// FuncNode {
//   func: 'Multiply',
//   args: [
//     ValueNode { value: 3.141592653589793 },
//     ValueNode { value: 5 },
//     ValueNode { value: 5 }
//   ]
// }
```

Do notice that this is still in a nested tree structure which Sonolus does not understand. In the compile step, Sonolus will flatten it:

```ts
// src/test.ts

const environment: CompileEnvironment = {
    nodes: [],
}
compile(Multiply(Math.PI, 5, 5), environment)
console.log(environment.nodes)

// Result:
// [
//   { value: 3.141592653589793 },
//   { value: 5 },
//   { func: 'Multiply', args: [ 0, 1, 1 ] }
// ]
```

Notice something smart that Sonolus.js does: it notices that 2nd and 3rd argument are both value node `5` and thus there is no need to duplicate, and simply point them to the same value node.

## Why Use JavaScript/TypeScript?

Why not simply invent our own language like:

```ts
Multiply(3.141592653589793, 5, 5)
```

and then a compiler that does the same flattening?

That can certainly work, and is how Sonolus Intermediate Language (SIL) works.

However, inventing a language is hard: you need to write a parser, a compiler, need to provide IDE support, and after all it is still alienating to newcomers.

Using an existing and popular language like JavaScript/TypeScript can bypass all those issues while making using of the already established ecosystem to provide excellent developer experience, and the most important of all: meta programming.

## Meta Programming

Meta programming, simply put, is to use programs to write programs.

Our first code `Multiply(Math.PI, 5, 5)` calculates the area of a circle with radius `5`, but what if we want to extract this logic and reuse it in more places?

Sonolus does not have a concept of functions, so we must reuse it on the node level. Traditionally in other languages this would be done with a code preprocessor, which is an added layer of learning curve.

However, because we are authoring nodes in JavaScript/TypeScript, you can simply write it like so:

```ts
// src/test.ts

function calculateCircleArea(radius: Code<number>) {
    return Multiply(Math.PI, radius, radius)
}

console.log(visualize(calculateCircleArea(5)))

// Result:
// Multiply(3.141592653589793, 5, 5)
```

Simple and intuitive: our function takes in an AST, construct a new AST with the logic and returns it!
