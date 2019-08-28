# babel-preset-vca-jsx
> 在使用了`@vue/composition-api`的项目中写`JSX`时，将自动导入`createElement`

感谢[@vue/composition-api](https://github.com/vuejs/composition-api)作者的贡献，由于`createElement`的外部实现，编写JSX不再局限于`render`函数或`setup`函数。

## see [Example](https://codesandbox.io/s/babel-preset-vca-jsx-example-7k5xs)


## 特点

1. 支持使用`@vue/cli-service-global`启动的快速原型项目
1. 支持基于`@vue/cli`创建的标准项目
1. 支持基于Typescript的`.tsx`组件
1. 兼容现有`render()`中写JSX的组件
1. 不再局限于在`render()`或`setup()`中写JSX
1. ...


## 使用前提

已安装`@vue/composition-api`和`@vue/cli-plugin-babel`的项目



## 如何使用?

1. 安装

   ```shell
   npm install babel-preset-vca-jsx --save-dev
   ```

2. 配置 `babel.config.js`

   ```javascript
   module.exports = {
       presets: [
           'vca-jsx',
           '@vue/app'
        ]
   };
   ```
   
   或 `.babelrc`
   
   ```javascript
   {
       "presets": [
           "vca-jsx",
           "@vue/app"
       ]
   }
   ```



## 为什么是preset而不是plugin?

因为当前的babel插件必须在`@vue/babel-preset-app`之后执行。

请参阅[Babel](https://babeljs.io/docs/en/plugins#plugin-ordering)了解plugins和presets的执行顺序
