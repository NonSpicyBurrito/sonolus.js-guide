# Ch.09 Build Setup

In this chapter, we will go over how to set up a npm build script to output our build to files.

## fs-extra

`BuildOutput` already contains built files as well as hash, all we need to do is to simply write them to disk so they can be served.

We can use [fs-extra](https://github.com/jprichardson/node-fs-extra) package help out tasks such as emptying a directory.

We create `src/build.ts` which outputs the files.

```ts
// src/build.ts

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
```

Code is very simple, first it empties the `dist` directory, and then output all 3 files with their hashes to it.

Normally the level is not needed as we are developing an engine, however in this guide we are going to output it so we can test it in a real production server as well.

Next, we add it as a `build` script to our `package.json` so that it is documented.

```jsonc
// package.json

{
    // ...
    "scripts": {
        // ...
        "build": "ts-node ./src/build.ts"
    }
    // ...
}
```

With that done, you can build your project by executing `build` script using terminal or IDE npm script integration.

```
npm run build
```
