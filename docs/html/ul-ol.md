# 无序列表 ul 和有序列表 ol

## ul

ul 标签常用来实现无序列表，ul 在外，li 在里面。样式是一个个点。默认最外层是实心点，然后是空心点，最后是方块点

```html
<ul>
  <li>ddd</li>
  <li>ddd</li>
  <li>ddd</li>
  <li>
    <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
      百度
    </a>
  </li>
</ul>
```

## ol

ordered list。ol 标签常用来实现有序列表，ol 在外，li 在里面。

```html
<ol>
  <li>ddd</li>
  <li>ddd</li>
  <li>ddd</li>
  <ol>
    <li>2</li>
    <li>2</li>
  </ol>
  <li>
    <ol>
      <li>2</li>
      <li>2</li>
    </ol>
  </li>
</ol>
```
