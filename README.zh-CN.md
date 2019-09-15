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


