# babel-preset-vca-jsx
> Support for automatic import of `createElement as h` and `setup` functional component syntax and `setup` template refs

## Feature

1. Automatically import `createElement as h` when writing `JSX`
1. The functional component syntax of the `setup()` by default
    ```javascript
    const Hello = (prop, ctx) => {
        const state = ref('hello world');
        return () => <h1>{state.value}</h1>;
    };
    ```
1. Allocating template refs with `JSX` on the render function returned by `setup()`
    ```javascript
    const Hello = createComponent({
        setup() {
            const root = ref(null);
            watch(() => console.log(root.value)); // <h1>...</h1>
            /*
            return () => h('h1', {
                ref: root
            }, 'hello world!');
            */
            return () => <h1 ref={root}>hello world!</h1>
        }
    });
    ```
1. Fixed [@vue/babel-sugar-v-model@1.1.2](https://github.com/vuejs/jsx/tree/dev/packages/babel-sugar-v-model) calling `this` in `setup()`


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

## Note

- Here we need to distinguish between the default `functional` component and the `composition-api-based` `functional` component.

  - The default `functional` component is essentially the` render` function. The shorthand in `jsx` is as follows
    ``` javascript
    const Test = ({ props, children, data, ... }) => {
        return <h1>Hello World!</h1>;
    };
    ```
    **Tips：The first letter of the variable name must be capitalized. For details of the callback parameters, see [Detail](https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)**

  - The `composition-api functional` component based on this plugin is essentially a `setup` function, and the shorthand in `jsx` is as follows
    ``` javascript
    const Test = (props, { refs, emit, ... }) => {
        return () => <h1>Hello World!</h1>;
    };
    ```
    **Tips：The difference from the default `functional` is that a` render` function is returned**
