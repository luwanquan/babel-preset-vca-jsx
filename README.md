# babel-preset-vca-jsx
> Support for automatic import of `createElement as h` and `setup` functional component syntax

## Feature

1. Automatically import `createElement as h` when writing `JSX`
1. The functional component syntax of the `setup` property by default


## [Example](https://codesandbox.io/s/babel-preset-vca-jsx-example-7k5xs)

Before compiling
```javascript
import { ref } from '@vue/composition-api';

const Hello = (prop, ctx) => {
    const state = ref('Hello World!');
    return () => (
        <h1>{state.value}</h1>
    );
};
```

After compilation
```javascript
import { ref, createElement as h } from '@vue/composition-api';

const Hello = {
    setup: (prop, ctx) => {
        const state = ref('Hello World!');
        return () => {
            return h('h1', state.value);
        };
    }
};
```

## Prerequisite

Project with `@vue/composition-api` and `@vue/babel-preset-app` installed



## How to use?

1. Install

    ```shell
    npm install babel-preset-vca-jsx --save-dev
    ```

1. Config `babel.config.js`

    ```javascript
    module.exports = {
        presets: [
            "vca-jsx",
            "@vue/app"
        ]
    };
    ```

   or `.babelrc`

   ```javascript
   {
       "presets": [
           "vca-jsx",
           "@vue/app"
       ]
   }
   ```


## Why is preset instead of plugin?

Because the current babel plugin must be executed after `@vue/babel-preset-app`.

See [Babel](https://babeljs.io/docs/en/plugins#plugin-ordering) for the order in which plugins and presets are executed.
