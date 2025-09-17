# Vite + Vue3 项目自动导入 api 和组件

解决Vite项目中，import导入的模块，每次都要手动输入比较麻烦。

对于一些已知常用的模块比如，vue，vue-router，element-plus等等，经常使用的api/组件，没有必要每次都去手动输入，因此，我们可以使用自动导入插件，自动导入这些模块，方便我们使用。

这次我们主要使用的 Vite 的插件是：`unplugin-auto-import/vite`，`unplugin-vue-components/vite`，`unplugin-vue-components/resolvers`

参考：<https://github.com/unplugin/unplugin-auto-import>，<https://github.com/unplugin/unplugin-vue-components>

自动导入的模块是：`vue`，`vue-router`，`element-plus`。

## 配置

```patch
# vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
+import AutoImport from 'unplugin-auto-import/vite'
+import Components from 'unplugin-vue-components/vite'
+import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
+    AutoImport({
+      resolvers: [ElementPlusResolver()],
+      imports: ['vue', 'vue-router'],
+      dts: import.meta.env.MODE === 'production' ? false : 'types/auto-imports.d.ts',
+    }),
+    Components({
+      resolvers: [ElementPlusResolver()],
+      dts: import.meta.env.MODE === 'production' ? false : 'types/components.d.ts',
+    })
  ],
})
```

## 说明

AutoImport 会辅助自动导入 `vue`，`vue-router`中的 api，`element-plus`的ElMessage。Components会辅助自动导入 `element-plus` 的组件和src/components下所有组件。

### 类型 dts

配置好之后，项目启动之后会自动生成类型文件，生产环境配置`dts`为`false`，不需要生成，开发环境配置`dts`为`types/auto-imports.d.ts`。如果不配置的话 dts 默认为false，写代码的时候没有类型提示。

如果是TypeScript项目，需要注意的是这些类型文件要放到 tsconfig.json 的 include 中

如果不是 TS 项目，则不需要配置，同时可以在gitignore文件中添加 `/types`

### ESlint

如果 ESlint 报错，可以关闭未定义的变量检查 `no-undef`，因为已经有类型提示了。如果还不行有报错的话或者不想关闭，可以在AutoImport的配置中添加`eslintrc: { enabled: true }`，会自动生成`.eslintrc-auto-import.json` 文件。

```patch
# vite.config.js
AutoImport({
  ...
+  eslintrc: {
+    enabled: true, 
+  },
})
```

然后在 .eslintrc.js 中添加：

```patch
# .eslintrc.js
module.exports = { 
  extends: [
    './.eslintrc-auto-import.json',// 自动导入的配置文件
  ],
}
```
