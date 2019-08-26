# babel-preset-vca-jsx
在`@ vue/composition-api` 的 `setup` 方法中写JSX时自动导入`createElement`

Automatic import of `createElement` when writing JSX in `@vue/composition-api` `setup` method



### How use / 如何使用?

1. Install / 安装

   ```shell
   npm install babel-preset-vca-jsx --save-dev
   ```

2. Config / 配置 `babel.config.js`

   ```javascript
   module.exports = {
       presets: ['vca-jsx']
   };
   ```



### Why is preset instead of plugin / 为什么是preset而不是plugin?

当你想在`vue-cli`零配置启动中进行快速原型开发时，由于`babel`配置执行顺序的原因，配置的babel-plugin会在`@vue/babel-preset-app`之前运行。所以我们需要配置为`babel-preset`，这样可以同时应用于`@vue/cli create`的项目，和`@vue/cli-service-global`启动的项目

When you want to perform rapid prototyping in the `vue-cli` zero configuration startup, the configured babel-plugin will run before `@vue/babel-preset-app` due to the order in which the babel configuration is executed. So we need to configure it as babel-preset, which can be applied to both `@vue/cli` create projects and `@vue/cli-service-global` projects

