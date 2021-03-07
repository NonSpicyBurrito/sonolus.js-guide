# Ch.07 Project Structure

In this chapter, we will go over one way of structuring your project to make it more maintainable.

## Project Structure

While there is no strict requirement to if you should or how you would structure your project (you can even leave all your code in one file like earlier in this guide), it is definitely recommended.

As your project grows in features and complexity, having files each dedicated for one concern can be a big productivity boost.

Personally I like to organize based on `BuildInput` and split up each responsibility into their corresponding files.

```
SRC
|   index.ts
|   serve.ts
|
+---engine
|   +---configuration
|   |       index.ts
|   |       options.ts
|   |
|   \---data
|       |   archetypes.ts
|       |   buckets.ts
|       |   index.ts
|       |
|       \---scripts
|               index.ts
|               initialization.ts
|
\---level
    \---data
            index.ts
```

Repository is now organized like so, with `src/index.ts` importing from `src/engine` and `src/level` (which each import and export their child folders) and exporting build output.

Development server is now in `src/serve.ts`
