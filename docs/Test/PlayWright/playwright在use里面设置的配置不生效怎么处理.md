# playwright 在 use 里面设置的配置不生效怎么处理

自己在测试的时候，在 `playwright.config.ts` use 中设置 viewport 配置项，但是没有生效，查了一圈资料发现是因为`projects`下面的配置项会覆盖`use`中的配置项，所以解决方法就是将`use`中的配置项放在`projects`里面，如下：

```patch
export default defineConfig({
  //.
  use: {
-   viewport: { width: 1920, height: 1080 }
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
+       viewport: { width: 1920, height: 1080 },
      },
    },
    //...
  ],
  //...
})
