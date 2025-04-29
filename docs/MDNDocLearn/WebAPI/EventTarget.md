# 事件对象学习之addEventListener新知

addEventListener方法是用来监听事件的,可以监听的事件参考 [MDN事件参考文档](https://developer.mozilla.org/zh-CN/docs/Web/Events?spm=5176.28103460.0.0.178d1db85kSPPF)
最多接收三个参数:

```js
element.addEventListener(type, listener);
element.addEventListener(type, listener, options);
element.addEventListener(type, listener, useCapture);
```

参数说明:

- type 就是事件类型是字符串
- listener 是事件处理函数
- options 是一个对象
- useCapture 是一个布尔值,默认为false, 标识是否在捕获阶段触发事件处理函数

下面重点介绍 listener 和 options

## listener

listener 就是事件处理函数,这个函数会根据事件类型被触发,函数的参数是事件对象,事件对象是一个对象,里面有事件相关的属性和方法。

常见属性:

- target 当前触发事件的元素
- currentTarget 当前事件处理函数的元素，可能是当前元素，也可能时代理的元素，比如事件代理（子元素的事件代理给父元素）
- type

常见方法：

- preventDefault 阻止默认行为，比如 a 标签的跳转，鼠标右键菜单等
- stopPropagation 阻止事件冒泡
- stopImmediatePropagation 也是阻止事件冒泡，和 stopPropagation 区别是，stopImmediatePropagation执行后，后续的监听函数不会执行。

## options

是一个对象,里面有下面几个属性：

- capture: 默认为 false, 表示是否在捕获阶段触发事件处理函数
- once: 默认为 false, 表示是否只执行一次事件处理函数
- passive: 默认为 false, 表示是否阻止默认行为，如果为 true，则不会阻止默认行为，如果为 false，则阻止默认行为。passive 和 preventDefault 是不兼容的，passive 为 true 时，事件处理函数中的 preventDefault() 方法无效。
- signal: 是一个 AbortSignal 实例对象（可以通过AbortController接口创建）, 当实例的 abort() 方法被调用时，监听器会被移除。

关于 signal 的 使用可以参考 [MDN事件参考文档中 addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
和 [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController)

## 拓展:事件类型

常见的监听事件可以分为 9 类,这里每项简单列举几个常见的事件:

- 鼠标事件, 例如:click,mouseover,mouseout,mousemove等
- 键盘事件, 例如:keydown,keyup,keypress等
- 表单事件, 例如:submit,focus,blur,change等
- 窗口和文档事件, 例如:scroll,resize,load,unload等
- 拖放事件, 例如:dragstart,drag,dragenter,dragleave,drop等
- 媒体事件, 例如:play,pause,ended等
- 动画和过度事件, 例如:animationstart,animationend,transitionstart,transitionend等
- 触摸事件, 例如:touchstart,touchmove,touchend,touchcancel等
- 自定义事件 ,就是自己通过new Event('eventName') 或者  new CustomEvent('myCustomEvent', { detail: { message: 'Hello!' } })创建的事件,通过element.dispatchEvent(event)方法触发.

## 拓展: Vue 框架中的封装

Vue2 在 @ 事件中封装了[事件修饰符](https://v2.cn.vuejs.org/v2/guide/events.html)
