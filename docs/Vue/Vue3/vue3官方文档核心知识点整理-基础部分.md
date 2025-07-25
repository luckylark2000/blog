# Vue3 官方文档核心知识点整理-基础部分

## 响应式核心

如果要将一个对象赋值给ref，想要对象被 reactive 转换为深层响应式对象，可以使用shallowRef 创建一个浅层响应式对象。同理，可以使用shallowReactive 创建一个浅层响应式对象。

## 计算属性

```ts
computed<void>(getter: ComputedGetter<void>, debugOptions?: DebuggerOptions): ComputedRef<void>
```

getter参数：

- **常用方式是** 传入一个函数，返回值会作为计算属性的返回值。
- 当 getter 参数是一个对象时，常用来创建一个**可写的计算属性**，对象中包含 getter 函数和 setter 函数，getter 函数返回值会作为计算属性的返回值，setter 函数会接受变更值作为参数。

debugOptions参数：

1. **onTrack**: 默认值是`undefined`，表示使用默认的跟踪策略。
2. **onTrigger**: 默认值是`undefined`，表示使用默认的触发策略。

> getter 中不要做赋值等改变其他状态的操作，也不要更新DOM（简单说不要有副作用）。
> 避免直接修改计算的值，可写计算属性并不常用，或者说谨慎使用。
>
> computed 中谨慎对响应式数组进行 reverse() 和 sort()，因为会改变原始数组，如果真的需要，进行浅拷贝后再使用。

## 类与样式

class 和style 的绑定，除了常见的字符串绑定，内联，还可以通过v-bind绑定对象或者数组

## 条件渲染

v-show 不支持在template元素上使用，因为template元素本身是一个不可见的包装器元素，最后并不会渲染到页面中。

v-if 和 v-for 同时存在时候，**v-if 的优先级更高**，v-for 的优先级较低。（谐音：三姨夫）

不推荐v-if 和 v-for 同时存在。v-if 中访问不到 v-for作用域内定义的变量别名

实在需要用到v-if 和 v-for 同时存在时，在外层用 v-for 的 template 元素包一层，内部就可以使用 v-if 访问到v-for作用域内定义的变量别名了。

> **不要用对象来作为 v-for 的key**

## 事件处理

### 内联事件处理器中访问事件参数的方式：

1. $event：`@click="warn('Form cannot be submitted yet.', $event)"`
2. 箭头函数: `@click="(event) => warn('Form cannot be submitted yet.', event)"`

### 事件修饰符:

1. prevent: `@submit.prevent="onSubmit"`
2. stop: `@submit.stop="onSubmit"`
3. once: `@submit.once="onSubmit"`
4. capture: `@submit.capture="onSubmit"`
5. self: `@submit.self="onSubmit"`
6. passive: `@submit.passive="onSubmit"`

事件修饰符可以链式调用

### 按键修饰符

每个举个例子

#### 按键别名

enter: `@keyup.enter="onEnter"`

#### 系统按键修饰符

```html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + 点击 -->
<div @click.ctrl="doSomething">Do something</div>
```

#### .exact 修饰符​

.exact 修饰符允许精确控制触发事件所需的系统修饰符的组合。

#### 鼠标按键修饰符​

.left
.right
.middle

```html
<input @click.left="onLeftClick" />
```

## 监听器

### watch

不能直接监听响应式对象的属性，如果一定要监听把属性放到getter函数的返回值中
例如：

```javascript
const obj = reactive({ count: 0 })

// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`Count is: ${count}`)
})

// 正确，因为 watch() 获取的是一个 getter 函数
watch(() => obj.count, (count) => {
})
```

watch 默认深层监听，可以通过配置 { deep: false } 来关闭，或者给`deep`赋值为数字，数字表示监听的深度。

### watchEffect

watchEffect 函数接受一个参数，参数是一个 effect 函数，这个 effect 函数会自动收集依赖，当依赖发生变化时，会重新执行 effect 函数。

也不需要指定 immediate 参数，因为 watchEffect 默认会立即执行一次。

大多数情况下**推荐使用 watchEffect 函数**，代码会更简洁，逻辑更清晰。

vue 3.5+ 支持副作用清理 onWatcherCleanup，作为替代，onCleanup 函数还作为第三个参数传递给 watch 侦听器回调，以及 watchEffect 作用函数的第一个参数。

### 回调触发时机

如果想在侦听器回调中能访问被 Vue 更新之后的所属组件的 DOM，你需要指明 flush: 'post'，或者直接使用 watchPostEffect 函数。

flush: 'sync'时，侦听器回调会在 Vue 进行任何更新之前触发，或者直接使用watchSyncEffect()同步触发的侦听器

注意 **要手动停止一个侦听器，请调用 watch 或 watchEffect 返回的函数**

## 模板引用

Vue3.5+ 的 useTemplateRef

## 组件基础

动态组件，通过Vue的内置 component 元素加 is 属性实现

插槽，通过slot标签实现
