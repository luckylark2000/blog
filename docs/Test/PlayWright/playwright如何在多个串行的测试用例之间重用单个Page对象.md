# playwright如何在多个串行的测试用例之间重用单个Page对象

Playwright Test 为每个测试创建一个独立的 Page 对象。但是，如果你想在多个测试之间重用单个 Page 对象，你可以在 test.beforeAll() 中创建自己的对象并在 test.afterAll() 中关闭它。

例如：

```ts
import { test, type Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test('runs first', async () => {
  await page.goto('https://playwright.nodejs.cn/');
});

test('runs second', async () => {
  await page.getByText('Get Started').click();
});
```
