# babel-preset-vca-jsx
Automatic import of `createElement` when writing JSX in `@vue/composition-api` `setup` method

[demo](https://codesandbox.io/s/babel-preset-vca-jsx-demo-7k5xs)

### How use?

1. Install

   ```shell
   npm install babel-preset-vca-jsx --save-dev
   ```

2. Config `babel.config.js`

   ```javascript
   module.exports = {
       presets: ['vca-jsx']
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



### Why is preset instead of plugin?

When you want to perform rapid prototyping in the `vue-cli` zero configuration startup, the configured babel-plugin will run before `@vue/babel-preset-app` due to the order in which the babel configuration is executed. So we need to configure it as babel-preset, which can be applied to both `@vue/cli` create projects and `@vue/cli-service-global` projects

