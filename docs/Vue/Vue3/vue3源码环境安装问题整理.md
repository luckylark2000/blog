# vue3 源码环境安装问题整理

## pnpm install 问题

```bash
node_modules/.pnpm/puppeteer@24.28.0_typescript@5.6.3/node_modules/puppeteer: running postinstall script...
```

就是在执行`npm install`的时候，会执行`postinstall`脚本，但是这个脚本一直停在这个puppeteer的安装过程。

查阅了一些资料，说是 puppeteer 需要下载的谷歌浏览器内核的源在国外，需要换源。

解决：在`.npmrc`文件中配置 `puppeteer_download_host` 的源，pnpm install 可以识别这个配置。

```text
puppeteer_download_host=https://cdn.npmmirror.com/binaries/chrome-for-testing
```

实测可用，就是安装的时候可能会慢一些，然后就是如果本地开了代理的话，可能要关了之后才能安装成功，都尝试一下吧
