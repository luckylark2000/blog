# vue3官方文档核心知识点整理-深入组件部分.md

## 组件注册

全局祖册的话，在main.js中 createApp创建的应用实例中调用app.component()方法中进行注册。

局部注册的话，推荐使用setup语法糖，直接import 引入组件即可。

## props

通过defineProps来接收props

watch不能直接监听props中值的变化，如果要监听的话，推荐使用watchEffect()方法。或者放到 watch 监听器的函数返回值中`watch(() => foo, /* ... */)`

合并传递多个props，可以直接传递一个对象，对象中的属性会作为props

## 事件

子组件的template模板中，可以通过 `$emit()` 方法触发父组件传给子组件的事件。

子组件中，可以在setup 语法糖中通过 `const emit = defineEmits(['eventName'])` 接收来自父组件的事件。`emit(eventName, [...args])`在js中中触发事件。

事件校验：
在 defineEmits 中要为事件添加校验，那么事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 emit 的内容，返回一个布尔值来表明事件是否合法。

## v-model 双向绑定

3.4 版本之后 推荐使用 defineModel 宏，更加方便。

### 传参

v-model 接受一个参数，这个参数是绑定的变量名，这个变量名会作为 v-model 的值。

可以传递多个v-model，只要参数不同即可。

### 修饰符

可以使用默认的.trim，.number 和 .lazy，**也可以自定义修饰符**。
