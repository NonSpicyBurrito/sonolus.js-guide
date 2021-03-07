# Ch.08 Serve Setup

In this chapter, we will go over how to set up a npm serve script to auto restart your development server when code is changed.

## Nodemon

We can use [nodemon](https://github.com/remy/nodemon) package to monitor our code and auto restart when it detects changes.

We create `nodemon.json` in our project root.

```json
// nodemon.json

{
    "watch": ["./src/*"],
    "exec": "ts-node ./src/serve.ts",
    "ext": "ts"
}
```

Next, we add it as a `serve` script to our `package.json` so that it is documented.

```jsonc
// package.json

{
    // ...
    "scripts": {
        "serve": "nodemon"
    }
    // ...
}
```

With that done, you can start development server by executing `serve` script using terminal or IDE npm script integration.

```
npm run serve
```
