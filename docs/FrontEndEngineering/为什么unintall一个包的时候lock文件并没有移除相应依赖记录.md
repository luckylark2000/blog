# 为什么 unintall 一个包的时候 lock 文件并没有移除相应依赖记录

`npm uninstall` 一个包时，**`package-lock.json` 中的依赖不会立刻被完全清理干净**，这是由 npm 的设计机制决定的。主要原因包括以下几点：

---

## 1. **依赖可能被其他包共享（共享依赖）**

npm 使用一种称为“依赖去重（deduplication）”的策略来减少重复安装。当你卸载一个包 A 时，如果 A 的某个依赖 B 同时也被其他已安装的包使用，那么 B **不会被移除**，因为它仍然被需要。

例如：

```json
// 假设 package.json 中有：
"dependencies": {
  "lodash": "^4.17.0",
  "moment": "^2.29.0"
}
```

而 `lodash` 和 `moment` 都依赖了同一个底层工具包 `some-util@1.0.0`。  
当你 `npm uninstall moment` 后，`some-util` 仍被 `lodash` 依赖，所以它会保留在 `node_modules` 和 `package-lock.json` 中。

---

## 2. **`package-lock.json` 是整个依赖树的快照**

`package-lock.json` 不仅记录你直接安装的包，还记录**完整的依赖树结构**（包括嵌套依赖、版本、完整性校验等）。卸载一个顶层包后，npm 会重新计算依赖树，但只移除**不再被任何包引用的子依赖**。

因此，只有当某个依赖**完全未被引用**时，才会从 `package-lock.json` 中删除。

---

## 3. **性能与一致性考虑**

每次卸载都彻底重建整个 lock 文件代价较高。npm 采用增量更新策略，在保证依赖树一致性的前提下，只做最小必要变更。这样可以：

- 提高命令执行速度；
- 减少因频繁重写 lock 文件带来的冲突（尤其在团队协作中）。

---

## 4. **手动清理残留依赖的方法**

如果你确定某些依赖已经无用，可以：

- 重新手动 `npm install`

- 运行 `npm prune`：移除 `node_modules` 中不在 `package.json` 里的包（但对 `package-lock.json` 影响有限）。
- 删除 `node_modules` 和 `package-lock.json`，然后运行 `npm install` 重新生成干净的依赖树（最彻底的方式）。

> 注意：`npm prune` 在较新版本的 npm 中作用有限，因为现代 npm 更依赖 lock 文件而非 `node_modules` 的状态。

---

### 总结

`package-lock.json` 不会立刻移除所有相关依赖，是因为：

- 依赖可能被其他包共享；
- lock 文件反映的是整个依赖图，而非仅顶层依赖；
- npm 优先保证依赖一致性与性能。

这是正常行为，并非 bug。如需彻底清理，可删除 lock 文件和 `node_modules` 后重装。
