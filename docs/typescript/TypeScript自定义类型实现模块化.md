# TypeScript 自定义类型实现模块化

## 前言

在编写ts代码的时候，发现声明类型的名称，编辑器编译不通过：
提示类型名称重复，根据提示在其他ts文件中发现了相同的类型名称，这个情况非常常见

经查阅资料发现:

若没有在ts文件中声明export，它会在全局范围内编译。

即使在不同文件夹的ts文件，声明具有相同名称的类型时也会出现重复标识

要使.ts文件成为封闭模块，方案有：

1. 在ts文件的最上面 声明 //export{}
2. 在tsconfig.json中新增选项moduleDetection, 设置为 “force”

确保每个非声明文件都被视为一个模块。（即使ts文件不包含import、export语句）

```json
{
  "compilerOptions": {
    // Ensures that every non-declaration file is treated as a module.
    "moduleDetection": "force"
  }
}
```

参考文档：

ts官方文档：moduleDetection 部分
