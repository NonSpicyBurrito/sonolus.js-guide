# Ch.03 Data Types

In this chapter, we will go over data types in Sonolus and Sonolus.js.

## Data Type in Sonolus

In Sonolus, value node can only be of `float` type, which is `number` type in JavaScript/TypeScript.

However, it does have a concept of `boolean` and uses `number` to represent it: `0` means `false`, and anything else means `true`. For functions like `Equal` and `Greater`, they will always return `1` as `true`.

## Data Types in Sonolus.js

In Sonolus.js, we explicitly separate these two to provide type checking support using TypeScript. This allows us to write less error prone code.

For example, if we use `5` as a condition for `If` which only accepts `boolean`, TypeScript will catch it and throw an error.

```ts
// src/test.ts

console.log(visualize(If(5, DebugLog(true), DebugLog(false))))

// ERROR!
```

This way we can quickly realize: "Aha, I meant to test for if `5` is greater than `0`!"

```ts
// src/test.ts

console.log(visualize(If(Greater(5, 0), DebugLog(true), DebugLog(false))))

// Result:
// If(Greater(5, 0), DebugLog(1), DebugLog(0))
```

## Explicit Conversion of Data Types

Sometimes it is useful to explicitly convert between the two types, we can do so with `num` and `bool` utility functions:

```ts
// src/test.ts

console.log(visualize(If(bool(5), DebugLog(true), DebugLog(false))))

// Result:
// If(5, DebugLog(1), DebugLog(0))
```

Do keep in mind with explicit conversion, you need to think carefully about how it will work.

In this case, the code no longer tests for "if `5` is greater than `0`" but rather tests for "if `5` is not equal to `0`."
