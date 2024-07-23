# 最新的 Vue-cli 创建的项目 npm install 的时候显示 eslint 版本冲突

vue-cli 5.0.8 在通过自定义创建的项目中，在 npm install 的时候会发现显示 eslint 版本冲突，冲突说的是

```bash
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR!
npm ERR! While resolving: @vue/eslint-config-standard@6.1.0
npm ERR! Found: eslint-plugin-vue@8.7.1
npm ERR! node_modules/eslint-plugin-vue
npm ERR!   dev eslint-plugin-vue@"^8.0.3" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer eslint-plugin-vue@"^7.0.0" from @vue/eslint-config-standard@6.1.0
npm ERR! node_modules/@vue/eslint-config-standard
npm ERR!   dev @vue/eslint-config-standard@"^6.1.0" from the root project
npm ERR!
npm ERR! Conflicting peer dependency: eslint-plugin-vue@7.20.0
npm ERR! node_modules/eslint-plugin-vue
npm ERR!   peer eslint-plugin-vue@"^7.0.0" from @vue/eslint-config-standard@6.1.0
npm ERR!   node_modules/@vue/eslint-config-standard
npm ERR!     dev @vue/eslint-config-standard@"^6.1.0" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
```

## 分析原因

就是说`@vue/eslint-config-standard@6.1.0`这个插件依赖的版本是`eslint-plugin-vue@"^7.0.0"`但是安装的却是`eslint-plugin-vue@"^8.0.3"`

## 解决

eslint-plugin-vue 版本换成 7.0.0 就行了。

```bash
npm install eslint-plugin-vue@^7.0.0
```
