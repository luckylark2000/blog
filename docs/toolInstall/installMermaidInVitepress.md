# 在 VitePress 中安装 mermaid 画 UML，并推荐在线 mermaid 编辑网址

[[toc]]

## 介绍

在 VitePress 中安装 Mermaid 需要安装一个插件，名字是 vitepress-plugin-mermaid。

[Github 地址](https://github.com/emersonbottero/vitepress-plugin-mermaid)

[插件使用文档](https://emersonbottero.github.io/vitepress-plugin-mermaid/)

## 插件安装

```bash
npm i vitepress-plugin-mermaid mermaid -D
```

## 导入配置

在.vitepress 文件夹下的 config.js 文件中编辑

```js
// .vitepress/config.js
import { defineConfig } from "vitepress";// [!code --]
import { withMermaid } from "vitepress-plugin-mermaid";// [!code ++]

export default defineConfig({// [!code --]
export default withMermaid({// [!code ++]
  // 你的原本配置
  // 可选地，可以传入MermaidConfig
  mermaid: {
    // 配置参考： https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults
  },
  // 可选地使用MermaidPluginConfig为插件本身设置额外的配置
  mermaidPlugin: {
    class: "mermaid my-class" // 为父容器设置额外的CSS类
  }
});
```

## 使用和 mermaid 在线编辑网址

直接在 markdown 文档中使用即可，语法规则见 [mermaid 文档](https://mermaid.js.org/intro/)

mermaid 在线编辑[地址](https://mermaid.live/)，可以一边编辑，一边实时预览

## 示例

### 流程图

示例一：

````mmd
```mermaid
flowchart LR
  Start --> Stop
```
````

```mermaid
flowchart LR
  Start --> Stop
```

示例二：

````mmd
```mermaid
flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
```
````

```mermaid
flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
```

### 类图

示例 1：

````mmd
```mermaid
classDiagram
class Shape
<<interface>> Shape
Shape : noOfVertices
Shape : draw()

```
````

```mermaid
classDiagram
class Shape
<<interface>> Shape
Shape : noOfVertices
Shape : draw()

```

示例二：

````mmd
```mermaid
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
      +String beakColor
      +swim()
      +quack()
    }
    class Fish{
      -int sizeInFeet
      -canEat()
    }
    class Zebra{
      +bool is_wild
      +run()
    }
```
````

```mermaid
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
      +String beakColor
      +swim()
      +quack()
    }
    class Fish{
      -int sizeInFeet
      -canEat()
    }
    class Zebra{
      +bool is_wild
      +run()
    }
```

### 饼图

````mmd
```mermaid
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
```
````

```mermaid
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
```
