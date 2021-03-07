# Ch.01 Development Environment Setup

In this chapter, we are going to set up our development environment that will be used throughout rest of this guide.

If you have previous experience with Node.js ecosystem, this should be fairly standard and straightforward.

If you are new, everything might seem overwhelming at first and at times you might need to Google for related information as covering every detail of Node.js ecosystem is out of this guide's scope. However, you do not need deep understanding of things in order to develop with Sonolus.js.

## Installing/Updating Node.js

First step is to download and install the latest LTS version of [Node.js](https://nodejs.org).

To verify you have successfully installed, execute in terminal:

```
node -v
```

or

```
npm -v
```

If you are able to see their version numbers, then you are good to go.

## Initialize Project

Let's first create a folder `sonolusjs-guide` to host all our project files.

Next, we need to create `package.json` by executing in terminal:

```
npm init
```

and after answering prompted questions, it is created for us.

## Installing Packages (Lazy)

If you are fine with going with the setup provided by this guide and don't want to worry about personalization (or simply don't have a strong opinion), then simply copy `package.json`, `tsconfig.json`, `.eslintrc.json`, and `.prettierrc.json` to your project folder, and run:

```
npm install
```

If you want to know what each package does relating to our project, below is a detailed step by step guide.

## Installing Packages (Step by Step)

The most important package of course is `sonolus.js` itself:

```
npm install --save-dev sonolus.js
```

In this guide we will also use TypeScript, however it is optional (though very much recommended):

```
npm install --save-dev typescript ts-node
```

[typescript](https://github.com/microsoft/TypeScript) is the core TypeScript package, while [ts-node](https://github.com/TypeStrong/ts-node) lets us run a `.ts` file without compiling.

TypeScript requires `tsconfig.json` which is a beast of itself, however you can simply use the one in this repository.

The next dependencies are mostly my personal preference, [eslint](https://github.com/eslint/eslint), [prettier](https://github.com/prettier/prettier), and related packages provides linting and code formatting, so we can worry less about trivial things and focus on our goal (all optional and up to personal preference):

```
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-simple-import-sort eslint-plugin-unused-imports
```

With those, you also need `.eslintrc.json` and `.prettierrc.json`, which you can configure according to your personal preferences or use the ones provided in this repository.

And lastly packages that we will use later on in this guide:

```
npm install --save-dev nodemon fs-extra @types/fs-extra
```

[nodemon](https://github.com/remy/nodemon) will auto restart development server for us, while [fs-extra](https://github.com/jprichardson/node-fs-extra) will help us output built files.

## IDE Setup (VSCode)

Lastly we are going to setup IDE.

This will differ depending on the IDE you are using, and in this guide we will use Visual Studio Code.

If you are lazy about this as well, you can copy the `.vscode` folder in this repository.

First we need to install extensions to support [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (you can skip this if you are not using them).

Secondly, navigate to File -> Preferences -> Settings, and in either User or Workspace, turn on `Editor: Format On Save`.

Lastly, create or open a `.ts` file, then in bottom status bar select TypeScript version to use workspace version.

## First Code

Create `src/test.ts` and type our first code:

```ts
// src/test.ts

console.log(visualize(Multiply(Math.PI, 5, 5)))

// Result:
// Multiply(3.141592653589793, 5, 5)
```

As you type, autocomplete should kick in and by using Tab key on `visualize` and `Multiply`, they should be automatically imported.

As you type, ESLint will come in to lint your code, and as you save the file, Prettier will come in and format your code nicely.

Finally, to make sure everything is working, let's run our code:

```
npx ts-node ./src/test.ts
```

If it runs and you are able to see the result, then you are all set up and ready to get into developing with Sonolus.js!
