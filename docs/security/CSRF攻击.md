# CSRF 攻击的介绍和防御

CSRF 攻击，即跨站请求伪造，是一种利用网站用户在当前会话中的身份信息，在用户不知情的情况下，向网站发送恶意请求，从而实现恶意目的。

一般是诱导用户通过点击某些链接，利用用户的登录身份信息，在第三方黑客站点发送请求 get/post 请求，实现恶意攻击，比如转账，修改用户名密码。

## 防御方法

### Cookie SameSite

关键的 Cookie 设置 SameSite 属性为Lax或者Strict。SameSite 这个属性是专门用来预防 CSRF 攻击的，能够杜绝一大部分的CSRF 攻击。
设置为 strict 之后，只有当请求的来源和目标地址的域名相同时，才允许发送请求。

### CSRF Token

设置 CSRF token，每当要进行表单提交的时候，从服务器生成一个随机的 CSRF token，然后将这个 token 放在一个隐藏的表单域中，在提交表单的时候，把这个 token 提交到服务器，服务器就可以通过这个 token 来判断是否是合法的请求。

### Referer/Origin

服务器根据 Referer 或者 Origin 来判断是否是合法的请求。Referer 和 Origin 的区别是，Referer 是包含完整的 URL，而 Origin 不包含路径信息。

而且 Referer 是可以被关闭的，因为有些网站处于安全考虑，不想把详细路径暴露给服务器，而 Origin 是只要发送Post请求，就会带上 Origin。
