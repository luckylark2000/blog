# playwright使用setup来保存登录状态信息

创建一个setup.ts文件

在setup.ts中添加登录逻辑

保存登录状态信息，一般信息有 cookies、localStorage 和 IndexedDB 数据、sessionStorage

cookies、localStorage 和 IndexedDB 数据 可以通过`page.context().storageState({path: 'auth.json'})`存储在auth.json文件中

sessionStorage 无法存储在auth.json文件中，需要单独存储和加载，例如：

```ts
const sessionStorage = await page.evaluate(() =>
  JSON.stringify(window.sessionStorage)
);
fs.writeFileSync('sessionStorage.json', sessionStorage, "utf-8");
```
