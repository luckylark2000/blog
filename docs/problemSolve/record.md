# 事件记录

## 3.14

记录问题：

问题点一
v-if 和 v-show 的区别：

在echarts的表现中不行

$on, $off, $emit的触发和注销

```js
// 正常触发和渲染

// 发射事件组件中：
// 代码：v-if的判断条件更改
this.$nextTick(() => {
  this.$emit('change', this.value)
})

// 其他接收组件中
mounted() {
  this.$on('change', (val) => {})
}
destroyed() {
  this.$off('change')
}
```

## antd select下拉框中 dropdownRender插槽不支持 input

解决办法：
https://github.com/vueComponent/ant-design-vue/issues/7304