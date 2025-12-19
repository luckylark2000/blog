# Fixtures 夹具的使用

可以参考两份文档：
中文文档：<https://playwright.cn/docs/test-fixtures>

英文文档：<https://playwright.dev/docs/auth#basic-shared-account-in-all-tests>

<https://playwright.dev/docs/test-fixtures>

常常用于测试用例之间共享数据，比如登录信息，浏览器实例等等。

## Fixtures 夹具来进行存储登录信息

如果是单页面,单用户可以覆盖所有测试用例，推荐使用 setup, 多项目多角色推荐使用 fixtures

两者大致逻辑差不太多

区别基本上就是 setup 是在每个测试用例执行之前执行，而 fixtures 是在每个测试用例执行之前执行一次，然后把 fixtures 的 test 导出，作为其他测试的 test
