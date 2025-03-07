# ECharts 为visualMap添加标题

根据[ECharts官方文档](https://echarts.apache.org/examples/zh/editor.html?c=line-gradient)，visualMap是不支持添加标题的，压根就没有这个配置项。

但是产品 UI 原型图上写得有标题，那么我们只能曲线救国，想方设法去实现这么一个效果了。这个时候我们可以说使用这个 graphic 图层配置来辅助实现这个效果。

graphic 图层配置介绍：<https://echarts.apache.org/zh/option.html#graphic>，官方文档还是非常详细的，可以参考一下。

我这边就直接贴上代码，大家可以参考一下。

```js
graphic: [{//由于visualMap没有直接设置标题的配置，这里使用graphic来设置
    type: 'text',
    left: '6px',//根据 visualMap 的位置自己调整
    bottom: '100%',//根据 visualMap 的位置自己调整
    style: {
        text: '自定义文字',
        fontSize: 14,
        fill: '#000'
    }
}],
```
