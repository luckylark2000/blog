# electron-vite vue3 的前端工程化配置，Git，ESlint，Prettier，stylelint，husky，commitlint

ESlint 和 Prettier 是 electron-vite 安装的时候自带的

Git

```bash
git init
```

## stylelint

[官网](https://stylelint.io/)

官网安装，记得安装
`stylelint-config-recess-order`格式化样式属性顺序

`stylelint-config-recommended-vue`可以格式化 vue 文件中的样式
[npm 仓库](https://www.npmjs.com/package/stylelint-config-recommended-vue)

## Husky

[官网地址](https://typicode.github.io/husky/zh/get-started.html)

官网介绍了如何初始化项目，更新 package.json 的 husky 的配置等

- commit 之前自动触发指令
- 结合 commitlint 可以控制 commit 信息的规范

默认初始化有 pre-commit

可以配合 commitlint，初始化一个 commit-msg

## 问题解决

### commit 提交信息不对

报错信息

```text
input: chore:新增工程化配置
✖   subject may not be empty [subject-empty]

✖   found 1 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
```

原因：`chore`后面紧跟的`:`必须要是英文而且它后面要有一个英文空格
正确的

```bash
git commit -m "chore: 新增工程化配置"
```
