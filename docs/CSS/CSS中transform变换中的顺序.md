# CSS 中 transform 变换中的顺序

transform 变换，有两种写法一种是直接写在 transform 属性中，另一种是分开作为css的属性来写例如：

```css
.box{
  transform: translate(100px, 100px) rotate(45deg) scale(2);
}

.box{
  translate: 100px, 100px;
  rotate: 45deg;
  scale: 2;
}
```

但是合在一起写的时候变换顺序就是按照从左到右的顺序执行的，而分开写的话顺序就是：

- translate
- rotate
- scale
