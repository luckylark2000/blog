# 使用 jimp 库生成图片

官方地址，推荐 github 上找

这边贴上一个生成随机图片的例子：

```ts
import { Jimp, loadFont } from "jimp";
import { SANS_10_BLACK } from "jimp/fonts";

export async function generateRandomTextPng(
  width = 200,
  height = 100
): Promise<Buffer> {
  // 创建空白图像（白色背景）
  const image = new Jimp({ width, height, color: 0xffffffff }); // 白色（ARGB）

  // 生成随机字符串（6 位字母 + 数字）
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let text = "";
  for (let i = 0; i < 6; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const font = await loadFont(SANS_10_BLACK);
  // 使用内置字体写文字（黑色）
  image.print({ x: 10, y: 10, text, font });
  // 返回 PNG Buffer
  return await image.getBuffer("image/png");
}
```
