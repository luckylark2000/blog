# vitest 的基本使用

## 安装

```bash
npm install -D vitest
```

## describe

describe 可以在当前上下文定义一个新的测试套件，作为一组相关测试基准以及其他嵌套测试套件。测试套件可让组织测试和基准，使报告更加清晰。

- describe.skip
- describe.skipIf
- describe.runIf
- describe.only
- describe.concurrent 测试套件中 describe.concurrent 会将所有测试标记为并发测试
- describe.sequential 会将每个测试标记为顺序测试
- describe.shuffle 随机运行测试方法
- describe.todo 暂存待以后实施的套件

## 模拟一个函数

`vi`

```ts
// utils.ts
export function testFn(number: number, callback: Function) {
  if (number > 10) {
    callback(number);
  }
}
```

```ts
// example.test.ts
import { testFn } from "./utils";
import { describe, expect, test, vi } from "vitest";

describe("function", () => {
  test("create a mock function", () => {
    const callback = vi.fn();
    testFn(12, callback);
    expect(callback).toHaveBeenCalled();
    expect(callback).toBeCalledWith(12);
  });
});
```
