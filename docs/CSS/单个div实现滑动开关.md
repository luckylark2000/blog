# 单个div实现滑动开关

这个是一个常见的前端面试题目，虽说只有差不多 30 行代码，知识点还不少，相对来说有点综合性，核心考察的是伪元素，相对位置，动画，css 变量，data-属性。

## 实现

精简版（后面附上进阶版）：

效果：

代码：

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>div switch</title>
</head>
<style>
  #switch {
    /* 变量 */
    --left: 4px;

    position: relative;
    width: 80px;
    height: 40px;
    background: #e0e0e0;
    border-radius: 20px;
  }

  #switch::before {
    content: '';
    position: absolute;
    width: 32px;
    height: 32px;
    background: white;
    border-radius: 50%;
    top: 4px;
    transform: translateX(var(--left));
    transition: transform 0.3s ease-in-out;
  }

  #switch[data-value="on"] {
    background: green;
    /* 80px 是div宽度，32px 是before伪元素宽度 */
    --left: calc(80px - 32px - 4px);
  }
</style>

<body>
  <div id="switch" data-value="off"></div>
  <script>
    document.getElementById('switch').addEventListener('click', (e) => {
      e.target.dataset.value = (e.target.dataset.value === 'off' ? 'on' : 'off');
    });
  </script>
</body>
</html>
```

## 解析

## 进阶

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<style>
  #switch {
    --left: 4px;

    position: relative;
    cursor: pointer;
    width: 80px;
    height: 40px;
    background: #e0e0e0;
    color: #e0e0e0;
    border-radius: 20px;
  }

  #switch::before {
    content: attr(data-off-text);
    /* content: attr(data-value); */
    /* content 在伪元素居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 32px;
    height: 32px;
    background: white;
    border-radius: 50%;
    top: 4px;
    transform: translateX(var(--left));
    transition: transform 0.3s ease-in-out;
  }

  #switch[data-value="on"] {
    background: green;
    /* 80px 是div宽度，32px 是before伪元素宽度 */
    --left: calc(80px - 32px - 4px);
    color: black;
  }

  #switch[data-value="on"]::before {
    content: attr(data-on-text);
  }
</style>

<body>
  <div id="switch"
       data-value="off"
       data-on-text="T"
       data-off-text="F"></div>
  <script>
    document.getElementById('switch').addEventListener('click', (e) => {
      const value = e.target.dataset.value;
      e.target.dataset.value = (value === 'off' ? 'on' : 'off');
    });
  </script>
</body>

</html>
```
