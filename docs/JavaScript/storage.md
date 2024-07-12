# 前端存储

## cookie

添加方式

- 一个一个添加
- 相同的键值只能存在一个

缺点

- 最大 4KB
- 每次都会发到服务器
- 只能用 document.cookie 来修改

## localStorage

HTML5 专门为存储设计的。除非手动删除不会删除

- 最大 5M
- API 简单易用
- 不会随 http 请求被发送出去

## sessionStorage

当前浏览器关闭会清空
