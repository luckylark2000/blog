# ESLint 中中全局变量出现未定义的错误

qiankun 集成子项目中，子项目中有这么一段代码

```js
if(window.__POWERED_BY_QIANKUN__){
    __webpack_public_path__=window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
```

这个ESlint 中会报一个未定义的错误，如何解决呢？

在eslintrc.js 文件中添加如下代码

```js
"globals": {
  "__webpack_public_path__": true
}
```
