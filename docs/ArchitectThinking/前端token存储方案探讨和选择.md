# 前端token存储方案探讨和选择

参考文章：[掘金：面试官：说说看，用户登录后拿到的 Token，你应该怎么存？存哪里？](https://juejin.cn/post/7545017768518533135)

## 只存储在webStorage中

优点：使用存取方便

缺点：容易遭受 XSS 攻击

## 只存储在 cookie 中

优点：自动携带在请求头中，服务端可以通过 set-cookie 响应头设置和更新

缺点：容易遭受 CSRF 攻击，但是合理配置，cookie也可以防止 CSRF/XSS 攻击

比如：

- 设置 HttpOnly 有效防止js获取 cookie，对抗 XSS 攻击
- secure 强制 https 防止中间人获取 cookie
- 使用 Anti-CSRF Token、验证 Origin/Referer Header 等来防止 CSRF 攻击
- 使用 SameSite=Lax或者Strict,限制跨站请求携带cookie, 来降低 CSRF 攻击的风险

## 只存储在内存中

安全性高，体验差，刷新或者关闭标签页就没啦，需要重新登录。只适用于银行系统，不介意频繁登录的场景

## 双 token 机制(令牌刷新机制)

一个access_token用于请求携带，另一个refresh_token用于刷新过期的access_token

access_token 短期生存，放在内存中，refresh_token 长期生存，可以放在HttpOnly cookie 中

refresh_token 只用于刷新，不能用于请求，获取难度比较高。refresh_token过期了，只能重新登录

对于 refresh_token 如果被拿到了，会非常危险，需要多层防护，比如

- 绑定ip和设备id
- 限制使用频率
- 令牌轮换，颁发新的access_token 的时候，也刷新旧的refresh_token，所有旧的refresh_token,access_token都失效
- 泄露检测

## 实战分析

github

应该是双 token

腾讯视频

应该也是双token,过一段时间就需要重新登录，大概一两个月

哔哩哔哩

华为云
