# 一个 Vue 指令监控 dom 元素的宽度来显示不同的内容

参考 API 是 ResizeObserver

指令的生命周期参考是 mounted 和 unmounted

名字 v-resize

## 应用

### Echarts 的图表根据不同的大小来显示不同的内容

### 筛选框来根据 dom 的不同宽度显示不同的列

一般情况可以根据媒体查询来做，但是媒体查询只能查询全局的配置，比如最大宽度，print 之类的，没法查询一个 dom 的 max-width。
