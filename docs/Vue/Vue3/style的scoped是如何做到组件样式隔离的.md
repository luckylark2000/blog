# vue 中 style 的 scoped 是如何做到组件样式隔离的？

## 实现

### Answer

Vue 的 scoped 样式通过编译时转换和运行时属性注入实现样式隔离。编译时为 CSS 选择器添加唯一属性选择器（如 `[data-v-xxxxxxx]`），运行时在组件根元素添加对应 data 属性，使样式只作用于当前组件。core:15-64 core:24-32

## 实现原理

### 编译时转换

Vue 使用 PostCSS 插件 `scopedPlugin` 处理 scoped CSS：core:119-121

1. **选择器重写**：为每个选择器添加组件唯一 ID 作为属性选择器
   - `h1 { color: red; }` → `h1[data-v-test] { color: red; }` core:29-36
   - 支持复杂选择器、伪类、媒体查询等 core:38-60

2. **特殊选择器处理**：
   - `:deep()`：深度选择器，不添加 scoped 属性 core:124-160
   - `:slotted()`：插槽内容选择器，添加 `-s` 后缀 core:165-185
   - `:global()`：全局选择器，不添加 scoped 属性 core:189-192

3. **动画名处理**：为 keyframes 添加唯一后缀避免冲突 core:25-28

### 运行时属性注入

运行时在组件根元素添加对应的 data 属性：core:24-32

- 组件实例通过 `__scopeId` 标识 scoped ID
- 渲染时自动为组件根元素和子元素添加 data 属性
- 支持嵌套组件的 scopeId 继承 core:34-49

### SSR 支持

服务端渲染同样支持 scoped 样式，在编译时直接将 scopeId 写入渲染字符串：core:6-19

## Notes

- scoped 样式隔离依赖于 CSS 属性选择器的优先级，不能完全阻止样式覆盖
- 使用 `:deep()` 可以穿透 scoped 样式影响子组件
- 插槽内容使用特殊的 `-s` 后缀实现样式隔离 core:355-366

### Citations

**File:** packages/compiler-sfc/src/style/pluginScoped.ts (L15-64)

```typescript
const scopedPlugin: PluginCreator<string> = (id = '') => {
  const keyframes = Object.create(null)
  const shortId = id.replace(/^data-v-/, '')

  return {
    postcssPlugin: 'vue-sfc-scoped',
    Rule(rule) {
      processRule(id, rule)
    },
    AtRule(node) {
      if (keyframesRE.test(node.name) && !node.params.endsWith(`-${shortId}`)) {
        // register keyframes
        keyframes[node.params] = node.params = node.params + '-' + shortId
      }
    },
    OnceExit(root) {
      if (Object.keys(keyframes).length) {
        // If keyframes are found in this <style>, find and rewrite animation names
        // in declarations.
        // Caveat: this only works for keyframes and animation rules in the same
        // <style> element.
        // individual animation-name declaration
        root.walkDecls(decl => {
          if (animationNameRE.test(decl.prop)) {
            decl.value = decl.value
              .split(',')
              .map(v => keyframes[v.trim()] || v.trim())
              .join(',')
          }
          // shorthand
          if (animationRE.test(decl.prop)) {
            decl.value = decl.value
              .split(',')
              .map(v => {
                const vals = v.trim().split(/\s+/)
                const i = vals.findIndex(val => keyframes[val])
                if (i !== -1) {
                  vals.splice(i, 1, keyframes[vals[i]])
                  return vals.join(' ')
                } else {
                  return v
                }
              })
              .join(',')
          }
        })
      }
    },
  }
}
```

**File:** packages/compiler-sfc/src/style/pluginScoped.ts (L124-160)

```typescript
      if (value === ':deep' || value === '::v-deep') {
        ;(rule as any).__deep = true
        if (n.nodes.length) {
          // .foo ::v-deep(.bar) -> .foo[xxxxxxx] .bar
          // replace the current node with ::v-deep's inner selector
          let last: selectorParser.Selector['nodes'][0] = n
          n.nodes[0].each(ss => {
            selector.insertAfter(last, ss)
            last = ss
          })
          // insert a space combinator before if it doesn't already have one
          const prev = selector.at(selector.index(n) - 1)
          if (!prev || !isSpaceCombinator(prev)) {
            selector.insertAfter(
              n,
              selectorParser.combinator({
                value: ' ',
              }),
            )
          }
          selector.removeChild(n)
        } else {
          // DEPRECATED usage
          // .foo ::v-deep .bar -> .foo[xxxxxxx] .bar
          warn(
            `${value} usage as a combinator has been deprecated. ` +
              `Use :deep(<inner-selector>) instead of ${value} <inner-selector>.`,
          )

          const prev = selector.at(selector.index(n) - 1)
          if (prev && isSpaceCombinator(prev)) {
            selector.removeChild(prev)
          }
          selector.removeChild(n)
        }
        return false
      }
```

**File:** packages/compiler-sfc/src/style/pluginScoped.ts (L165-185)

```typescript
      if (value === ':slotted' || value === '::v-slotted') {
        rewriteSelector(
          id,
          rule,
          n.nodes[0],
          selectorRoot,
          deep,
          true /* slotted */,
        )
        let last: selectorParser.Selector['nodes'][0] = n
        n.nodes[0].each(ss => {
          selector.insertAfter(last, ss)
          last = ss
        })
        // selector.insertAfter(n, n.nodes[0])
        selector.removeChild(n)
        // since slotted attribute already scopes the selector there's no
        // need for the non-slot attribute.
        shouldInject = false
        return false
      }
```

**File:** packages/compiler-sfc/src/style/pluginScoped.ts (L189-192)

```typescript
      if (value === ':global' || value === '::v-global') {
        selector.replaceWith(n.nodes[0])
        return false
      }
```

**File:** packages/runtime-core/**tests**/scopeId.spec.ts (L24-32)

```typescript
  test('should attach scopeId', () => {
    const App = {
      __scopeId: 'parent',
      render: () => h('div', [h('div')]),
    }
    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(serializeInner(root)).toBe(`<div parent><div parent></div></div>`)
  })
```

**File:** packages/runtime-core/**tests**/scopeId.spec.ts (L34-49)

```typescript
  test('should attach scopeId to components in parent component', () => {
    const Child = {
      __scopeId: 'child',
      render: () => h('div'),
    }
    const App = {
      __scopeId: 'parent',
      render: () => h('div', [h(Child)]),
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(serializeInner(root)).toBe(
      `<div parent><div child parent></div></div>`,
    )
  })
```

**File:** packages/runtime-core/**tests**/scopeId.spec.ts (L355-366)

```typescript
    // - slotted scopeId (with `-s` postfix) from child (the tree owner)
    expect(serializeInner(root)).toBe(
      `<div child parent>` +
        `<div parent child-s></div>` +
        // component inside slot should have:
        // - scopeId from template context
        // - slotted scopeId from slot owner
        // - its own scopeId
        `<span child2 parent child-s></span>` +
        `</div>`,
    )
  })
```

**File:** packages/compiler-sfc/src/compileStyle.ts (L119-121)

```typescript
  if (scoped) {
    plugins.push(scopedPlugin(longId))
  }
```

**File:** packages/compiler-sfc/**tests**/compileStyle.spec.ts (L29-36)

```typescript
  test('simple selectors', () => {
    expect(compileScoped(`h1 { color: red; }`)).toMatch(
      `h1[data-v-test] { color: red;`,
    )
    expect(compileScoped(`.foo { color: red; }`)).toMatch(
      `.foo[data-v-test] { color: red;`,
    )
  })
```

**File:** packages/compiler-sfc/**tests**/compileStyle.spec.ts (L38-60)

```typescript
  test('descendent selector', () => {
    expect(compileScoped(`h1 .foo { color: red; }`)).toMatch(
      `h1 .foo[data-v-test] { color: red;`,
    )

    // #13387
    expect(
      compileScoped(`main {
  width: 100%;
  > * {
    max-width: 200px;
  }
}`),
    ).toMatchInlineSnapshot(`
      "main {
&[data-v-test] {
  width: 100%;
}
> *[data-v-test] {
    max-width: 200px;
}
}"`)
  })
```

**File:** packages/compiler-ssr/**tests**/ssrScopeId.spec.ts (L6-19)

```typescript
  test('basic', () => {
    expect(
      compile(`<div><span>hello</span></div>`, {
        scopeId,
        mode: 'module',
      }).code,
    ).toMatchInlineSnapshot(`
      "import { ssrRenderAttrs as _ssrRenderAttrs } from "vue/server-renderer"

      export function ssrRender(_ctx, _push, _parent, _attrs) {
        _push(\`<div\${_ssrRenderAttrs(_attrs)} data-v-xxxxxxx><span data-v-xxxxxxx>hello</span></div>\`)
      }"
    `)
  })
```
