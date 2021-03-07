# Ch.04 Code

In this chapter, we will go over `Code` type in Sonolus.js.

## Code Type vs Node Type

You may have noticed, when we are working with values such as `5`, we never explicitly create a value node for it, and Sonolus.js seems to understand it and wraps it into a value node.

Sonolus.js provides a type `Code` which can understand an extended set of syntaxes and clean them up for us. After all, repeatedly writing out a value node would be very verbose, and so does other common syntaxes.

## Values

As mentioned above, you can directly use `number` and `boolean` values and Sonolus.js functions that accepts `Code` will understand it.

```ts
// src/test.ts

console.log(visualize(Subtract(5, 2)))

// Result:
// Subtract(5, 2)
```

## Pointers

Pointers point to a memory location in a block (we will talk about pointers in details in the next chapter), for example the 0th value in Level Data block is the current level time, and we can simply use `Time` pointer for it.

When you pass a pointer where Sonolus.js accepts `Code`, it will automatically calls the getter function `.get()` of it.

```ts
// src/test.ts

console.log(visualize(GreaterOr(Time, 5)))

// Result:
// GreaterOr(Get(1, 0), 5)
```

## Execute Shorthand

Lastly, when you pass an array where Sonolus.js accepts `Code`, it will wrap it in an `Execute` function node.

```ts
// src/test.ts

console.log(visualize([Subtract(5, 2), GreaterOr(Time, 5)]))

// Result:
// Execute(Subtract(5, 2), GreaterOr(Get(1, 0), 5))
```
