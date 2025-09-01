# pnpm 使用问题处理

## pnpm i 一直打印 install

pnpm i 一直打印 install 的话一般是因为 package.json 中的 scripts 中配置了 install 脚本，删除即可：

```patch
"scripts": {
-  "install": "pnpm install"
}
```

原因的话应该是因为 pnpm 默认会执行 npm install，但是 npm install 会执行 scripts 中的 install 脚本，导致一直打印 install，死循环了

## 子项目开发环境启动时提示找不到 cache-loader 和 css-loader 模块

找不到 cache-loader 和 css-loader 模块的原因是因为子项目没有安装这两个模块，而是安装到根级项目的 node_modules 中，导致子项目找不到这两个模块，解决方法可以在子项目 package.json 中添加这两个模块的依赖，但是更

