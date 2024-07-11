# webpack 快速上手

## webpack 核心概念

- entry 入口模块文件路径
- output 输出 bundle 文件路径
- module 模块 ，webpack 构建对象
- bundle 输出文件，webpack 构建产物
- chunk 中间文件，webpack 构建的中间产物
- loader 文件转换器
- plugin 插件，执行特定的任务

## 快速开始

- npm init 初始化

```bash
npm init -y
```

- 安装 webpack 和 webpack-cli 包

```bash
npm install -D webpack webpack-cli
```

- 创建 src/index.js，写入

```js
console.log("hello");
```

- 创建 public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="../dist/bundle.js"></script>
  </head>
  <body>
    ddddd
  </body>
</html>
```

- 创建 webpack.config.js 文件，写入

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js"
  }
};
```

- 在 package.json 文件里面配置 build 命令

```json
"build":"webpack"

```

- npm run build 完成打包构建

### 分析

在 dist/bundle.js 中输出的文件，精简版

```js
(() => {
  var __webpack_modules__ = {
    "./src/index.js": () => {
      eval(
        'console.log("hello");\r\n\n\n//# sourceURL=webpack://webpack-quick-start/./src/index.js?'
      );
    }
  };

  var __webpack_exports__ = {};
  __webpack_modules__["./src/index.js"]();
})();
```

- 最外层是一个立即执行函数
- 把代码文件路径作为 \_\_webpack_modules\_\_ 的属性名，属性值是回调函数，该回调函数返回一个 eval 函数，eval 函数存放的是代码内容。
- 在立即执行函数里面通过 \_\_webpack_modules\_\_ 访问属性获取并执行该回调函数，从而达到执行模块代码的目的。

## css 资源加载

webpack 通过各种有关 css 的 loader，实现 css in js，把 css 文件放到 bundler.js 里面，而 bundler.js 通过操作 dom 的方式，把样式文件插入到 dom 里面，实现样式的加载。

### 安装

```bash
npm install --save-dev style-loader css-loader
```

### 配置

```js{11-18}
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
```

### 分析 css 资源加载

css-loader 负责加载 entry 入口导入的 css 文件，style-loader 负责把 css 文件以 link 的方式加到 html 的 header 中。
注意：
顺序是从下到上，从右到左，类似于栈，不能更换顺序，更换会解析出错，build 的时候报错

## 创建属于自己的文件

在 src 下创建一个自定义文件名 例如 test.esz，写入：

```txt
<script>
    export default {
        a:1,
        b:2,
    }
</script>
```

在根目录新建 `loader/eszLoader.js`，写入：

```js
const REG = /<script>([\s\S]+?)<\/script>/;

module.exports = function (source) {
  console.log("== esz-loader running ==", source);
  const __source = source.match(REG);
  //   console.log(__source);
  return __source && __source[1] ? __source[1] : source;
};

// 判断当前模块是否为主模块，如果为主模块，则运行一下代码
// 用来对loader进行单独测试
if (require.main === module) {
  const source = `<script>
    export default {
        a:1,
        b:2,
    }
</script>`;

  const match = source.match(REG, source);
  console.log(match);
}
```

在`webpack.config.js`中的`module`下的 rules 中添加 `eszLoader`，写入：

```js
module: {
  rules: [
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"]
    },
    {
      test: /\.esz$/,
      use: [path.resolve(__dirname, "./loaders/eszLoader.js")]
    }
  ];
}
```

执行 npm run build 就可以在输出的 bunder.js 顶部看到插入的 `test.esz`的内容

## 编写自己的插件 plugin

安装 webpack-sources 用于添加能够在 bundler.js 中处理资源的 api 例如：ConcatSource

```bash
npm i -D webpack-sources
```

- 在根目录新建 `plugin/FooterPlugin.js，方便在 bundle.js 的尾部添加自己想要的内容
- FooterPlugin.js 中写下如下内容

```js
const { ConcatSource } = require("webpack-sources");

class FooterPlugin {
  constructor(options) {
    console.log("FooterPlugin", options);
    this.options = options;
  }
  apply(compiler) {
    // console.log("FooterPlugin", compiler);
    compiler.hooks.compilation.tap("FooterPlugin", compilation => {
      compilation.hooks.processAssets.tap("FooterPlugin", () => {
        // const chunks = compilation.chunks;
        // console.log("FooterPlugin", chunks);
        for (const chunk of compilation.chunks) {
          for (const file of chunk.files) {
            console.log("file", file);
            const comment = `/*${this.options.banner}*/`;
            compilation.updateAsset(
              file,
              old => new ConcatSource(old, "\n", comment)
            );
          }
        }
      });
    });
  }
}

module.exports = FooterPlugin;
```

- 在`webpack.config.js`中写下如下配置

```js
const FooterPlugin = require("./plugins/FooterPlugin");// [!code ++]

// ...原始代码

module.exports = {
    // ...
    plugins: [
    new webpack.BannerPlugin({
        banner: "欢迎"
    }),
    new FooterPlugin({// [!code ++]
        banner: "hello estar"// [!code ++]
    })// [!code ++]
    ];
    }
```
