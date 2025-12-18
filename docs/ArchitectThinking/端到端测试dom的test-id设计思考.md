# 端到端测试dom的test-id设计思考

背景：给每一个dom添加test-id属性，方便测试,自动生成并填入内容

推荐使用指令

```js
// src\directives\testDirective.js自动给dom添加data-test-*属性，方便填入信息和测试
export default {
  install(app) {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境：注册空指令，不执行任何操作
      app.directive('test', () => ({}))
    } else {
      // 开发/测试环境：正常设置 data-test-* 属性
      app.directive('test', {
        mounted(el, binding) {
          const { arg, value } = binding
          if (arg) {
            el.setAttribute(`data-test-${arg}`, value ?? '')
          }
        },
        updated(el, binding) {
          const { arg, value } = binding
          if (arg) {
            el.setAttribute(`data-test-${arg}`, value ?? '')
          }
        }
      })
    }
  }
}
```
