# window环境本地前端预构建失败如何弹窗提示失败

事情是这样的，我本地有这么两个场景

- 写了一个与构建版本的JS脚本，用来自动构建出包，并打包成`.zip`文件，然后自动发邮件给后端的邮箱。
- 等构建出包，使用js脚本，然后解压到本地启动的 nginx 服务器中的固定目录下

原本就是想，`npm run build:local`之后，全自动化处理了,但是有时候可能会构建失败，我自己以为已经构建完毕了，但是实际上没有构建成功，所以就出现了这样的问题，如何提示用户构建失败呢？

我查阅了 Node.js 唤起 windows 系统失败提示的方法，下面介绍一下核心使用方法，新建一个 build.js 文件，写入下面的代码：

```javascript
const { exec } = require('child_process');
const message = '前端项目构建失败，请排查问题重试'
const title = '构建失败';
exec(`powershell -command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show('${message}','${title}','OK','Error')"`);
```

node 运行这个脚本，就会唤起 windows 系统的弹窗。
