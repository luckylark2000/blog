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