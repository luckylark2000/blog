// ==== MVP Reactive Implementation ====
 
// 全局变量
let activeEffect = null
const targetMap = new WeakMap()
const reactiveMap = new WeakMap()
 
// Effect 类
class ReactiveEffect {
  constructor(fn, scheduler = null) {
    this.fn = fn
    this.scheduler = scheduler
    this.deps = []
    this.active = true
  }
 
  run() {
    if (!this.active) {
      return this.fn()
    }
    
    const prevEffect = activeEffect
    activeEffect = this
    
    try {
      return this.fn()
    } finally {
      activeEffect = prevEffect
    }
  }
 
  stop() {
    if (this.active) {
      this.deps.forEach(dep => dep.delete(this))
      this.deps.length = 0
      this.active = false
    }
  }
}
 
// 依赖收集
function track(target, key) {
  if (!activeEffect) return
  
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}
 
// 触发更新
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  
  const dep = depsMap.get(key)
  if (!dep) return
  
  const effects = [...dep]
  effects.forEach(effect => {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  })
}
 
// reactive 实现
function reactive(target) {
  if (!isObject(target)) {
    return target
  }
  
  // 避免重复代理
  const existing = reactiveMap.get(target)
  if (existing) {
    return existing
  }
  
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      
      // 依赖收集
      track(target, key)
      
      // 深度响应式
      if (isObject(result)) {
        return reactive(result)
      }
      
      return result
    },
    
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      
      // 值改变时触发更新
      if (oldValue !== value) {
        trigger(target, key)
      }
      
      return result
    }
  })
  
  reactiveMap.set(target, proxy)
  return proxy
}
 
// ref 实现
function ref(value) {
  return new RefImpl(value)
}
 
class RefImpl {
  constructor(value) {
    this._value = isObject(value) ? reactive(value) : value
  }
  
  get value() {
    track(this, 'value')
    return this._value
  }
  
  set value(newValue) {
    if (newValue !== this._value) {
      this._value = isObject(newValue) ? reactive(newValue) : newValue
      trigger(this, 'value')
    }
  }
}
 
// computed 实现
function computed(getter) {
  return new ComputedRefImpl(getter)
}
 
class ComputedRefImpl {
  constructor(getter) {
    this._value = undefined
    this._dirty = true
    
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true
        trigger(this, 'value')
      }
    })
  }
  
  get value() {
    if (this._dirty) {
      this._value = this.effect.run()
      this._dirty = false
    }
    track(this, 'value')
    return this._value
  }
}
 
// effect API
function effect(fn, options = {}) {
  const reactiveEffect = new ReactiveEffect(fn, options.scheduler)
  reactiveEffect.run()
  
  const runner = () => reactiveEffect.run()
  runner.effect = reactiveEffect
  return runner
}
 
// 工具函数
function isObject(val) {
  return val !== null && typeof val === 'object'
}
 
// 导出
// export { reactive, ref, computed, effect }

// ----------------- 测试 -----------------------
// 基本用法
const state = reactive({ count: 0, name: 'Vue' })
 
effect(() => {
  console.log('count changed:', state.count)
})
 
state.count++ // 输出: count changed: 1
 
// ref 用法
const count = ref(0)
effect(() => {
  console.log('ref count:', count.value)
})
count.value++ // 输出: ref count: 1
 
// computed 用法
const double = computed(() => count.value * 2)
console.log(double.value) // 输出: 2