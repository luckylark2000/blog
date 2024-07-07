# UML 类图

<!-- markdownlint-disable -->

## UML 是什么

统一建模语言 Unified Modeling Language
软件设计的绘图标准
UML 不仅有类图，很多种图，这里主要介绍类图

## 画图工具

网站 ProcessOn

## 类图

三个区域：名称，属性，方法

权限描述 `+`表示 public，`#`表示 protected，`-`表示 private
| <center>类图</center>|
|-----------------------------------------------------------------------------------------------|
| + public 属性名：type=defaultValue<br># protected 属性名: type<br>- private 属性名: type |
| + public 方法名(a: type, b: type): returnType<br># protected 方法名(a: type)<br>- private 方法名(a: type) |

## 实现

空三角箭头，虚线

![alt text](../public/images/uml-interface-class.png)

## 泛化

空三角箭头，实线
![alt text](../public/images/uml-class-object.png)

## 关联

一个类与另一个类有关系，普通箭头，实线。可细分为聚合、组合、依赖（这三种了解即可）
![alt text](../public/images/uml-relevance.png)

### 聚合

整体包含部分，部分可以脱离整体而存在
![alt text](../public/images/uml-polymerization.png)

### 组合

整体包含部分，部分不可以脱离整体
![alt text](../public/images/uml-combination.png)

### 依赖

不是属性关系，而是函数参数或返回值
![alt text](../public/images/uml-depend-on.png)
