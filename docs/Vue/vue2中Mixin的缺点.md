# Vue2中mixin的缺点

参考官方文档：<https://cn.vuejs.org/guide/reusability/composables#vs-mixins>

数据来源不清晰：多个mixin之间数据来源不清晰，理解代码、定位 bug 困难

各个组件中命名的 mixin 可能冲突

隐式跨 mixin 交流，多个mixin之间依赖共享的属性名来进行相互作用，隐性地耦合在一起
