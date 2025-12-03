# data-*属性的使用.md

参考：<https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/data->*

<https://developer.mozilla.org/zh-CN/docs/Web/HTML/How_to/Use_data_attributes>

可用于存储数据，但是不能被浏览器直接访问。

## 命名

data-属性名,属性名需要使用小写字母，多个单词使用连字符`-`连接

## 获取

1. element.dataset.属性名
2. element.getAttribute('data-属性名')
3. CSS 选择器 [data-属性名]
4. CSS的attr(属性名)

## 应用

### 图片懒加载

初始时候赋值 data-src, 进入视口才 data-src 赋值给 src 属性

### 选择商品
