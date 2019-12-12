# babel-preset-vca-jsx
> 支持自动导入`createElement as h`以及`setup`函数式组件语法和`setup`中的模板refs引用

## 功能点

1. 写`JSX`时自动导入`createElement as h`
1. 默认只有`setup()`的函数式组件语法
    ```javascript
    const Hello = (prop, ctx) => {
        const state = ref('hello world');
        return () => <h1>{state.value}</h1>;
    };
    ```
1. 在`setup()`返回的渲染函数上使用`JSX`分配模板引用
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
1. 修复 [@vue/babel-sugar-v-model@1.1.2](https://github.com/vuejs/jsx/tree/dev/packages/babel-sugar-v-model) 在 `setup()` 中调用 `this` 的问题


## [案例](https://codesandbox.io/s/babel-preset-vca-jsx-example-7k5xs)

编译前
```javascript
import { ref } from '@vue/composition-api';

const Hello = (prop, ctx) => {
    const state = ref('Hello World!');
    return () => (
        <h1>{state.value}</h1>
    );
};
```

编译后
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
            "vca-jsx",
            "@vue/app"
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

## 注意

- 这里需要区分默认的 `functional`组件和基于 `composition-api` 的 `functional`组件的概念

  - 默认的 `functional`组件实质是 `render`函数，`jsx`中的简写写法如下
    ``` javascript
    const Test = ({ props, children, data, ... }) => {
        return <h1>Hello World!</h1>;
    };
    ```
    **注：变量名首字母必须为大写，具体回调参数见[详情](https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)**

  - 基于本插件的 `composition-api functional`实质是 `setup`函数，`jsx`中的简写写法如下
    ``` javascript
    const Test = (props, { refs, emit, ... }) => {
        return () => <h1>Hello World!</h1>;
    };
    ```
    **注：与默认`functional`的区别是返回了一个`render`函数**
