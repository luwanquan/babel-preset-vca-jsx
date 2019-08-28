# babel-preset-vca-jsx
> Automatically import `createElement as h` when writing `JSX` in a project using `@vue/composition-api`

Thanks to [@vue/composition-api](https://github.com/vuejs/composition-api) author's contribution, Due to the external implementation of `createElement`, writing `JSX` is no longer limited to the `render()` or the `setup()`.

## see [Example](https://codesandbox.io/s/babel-preset-vca-jsx-example-7k5xs)


## Feature

1. Support for rapid prototyping projects launched with `@vue/cli-service-global`
1. Support for standard projects created based on `@vue/cli`
1. Support for Typescript-based `.tsx` components
1. Compatible with existing components that use the `render` function
1. Not limited to writing JSX in the `render()` or `setup()`
1. ...



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
           'vca-jsx',
            '@vue/app'
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
