# antd Select下拉框中 dropdownRender插槽不支持 input

参考issue链接: <https://github.com/vueComponent/ant-design-vue/issues/7304>

## 组件实现

### 支持 mouseleave popup 的时候自动关闭下拉框

```vue
<template>
    <div style="width: 240px" class="refresh" @mousedown="handleSelectMouseDown">
      <a-select
        ref="selectRef"
        :open="selectOpen"
        default-value="7" style="width: 240px" @change="handleChange"
        :getPopupContainer="triggerNode =>triggerNode.parentNode"
      >
        <a-icon slot="suffixIcon" type="down" @click.stop="selectIconClick" :rotate="selectOpen ? 180 : 0"/>
        <a-select-option v-for="item in daySelectItems" :key="item.value" :value="item.value">{{ item.label }}
        </a-select-option>
        <div slot="dropdownRender" slot-scope="menu">
          <v-nodes :vnodes="menu"/>
          <a-divider style="margin: 4px 0;"/>
          <a-space style="padding: 4px 8px" >
            <a-input placeholder="请输入天数" v-model="days" @click="e=>e.target.focus()"/>
            <a-button type="primary" @click="addItem">添加</a-button>
          </a-space>
        </div>
      </a-select>
    </div>
<template>

<script>
export default {
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      days: '',
      selectOpen: false,
      daySelectItems: [{ value: '7', label: '最近 7 天' },
        { value: '14', label: '最近 14 天' },
        { value: '30', label: '最近 30 天' },
        { value: '90', label: '最近 90 天' },
        { value: '', label: '全部时间' }
      ]
    }
  },
  methods: {
    handleChange(value) {
      this.selectOpen = false
      this.cleanupMouseLeaveListener()
      // TODO 发请求获取数据
    },
    addItem() {
      if (this.days === '') {
        this.$message.error('请输入天数');
        return;
      }
      //正则匹配正整数
      if (!/^[1-9]\d*$/.test(this.days)) {
        this.$message.error('请输入正整数');
        this.days = ''
        return;
      }
      
      // 重复的提示
      if (this.daySelectItems.some(item => item.value == this.days)) {
        this.$message.info('已包含此选项');
        return;
      }

      this.daySelectItems.push({ value: this.days.toString(), label: `最近 ${this.days} 天` });
      this.days = '';
    },
    async handleSelectMouseDown(e) {
      if (e.target.closest('.anticon')) return; // 解决点击图标时，不触发下拉框的展开的问题
      e.preventDefault()
      this.selectOpen = true
      this.mouseLeaveHandler = () => {
        this.selectOpen = false
      }
      this.$nextTick(() => {
        this.$refs.selectRef?.popupRef?.$el.addEventListener('mouseleave', this.mouseLeaveHandler)
      })
    },
    cleanupMouseLeaveListener() {
      if (this.mouseLeaveHandler) {
        this.$refs.selectRef?.popupRef?.$el.removeEventListener('mouseleave',this.mouseLeaveHandler)
        this.mouseLeaveHandler = null
      }
    },
    selectIconClick() {
      this.selectOpen = !this.selectOpen
    }
  },
  beforeDestroy() {
    this.cleanupMouseLeaveListener()
    EventBus.$off('currentRecord')
  },
}
</script>

<style lang="less" scoped>
// 解决弹出框闪烁的问题
/deep/ .ant-dropdown {
  pointer-events: auto!important;//确保了元素可以响应鼠标事件
  opacity: 1!important;//下拉菜单设置为完全不透明，避免透明度变化引起闪烁
}
/deep/ .slide-up-enter, .slide-up-appear {
  animation-duration: 0s;//动画持续时间为0
}
</style>
```

### 不支持 mouseleave 自动关闭

```vue
<template>
    <div style="width: 240px" class="refresh" @mousedown="handleSelectMouseDown">
      <a-select
        ref="selectRef"
        :open="selectOpen"
        default-value="7" style="width: 240px" @change="handleChange"
        :getPopupContainer="triggerNode =>triggerNode.parentNode"
      >
        <a-icon slot="suffixIcon" type="down" @click.stop="selectIconClick" :rotate="selectOpen ? 180 : 0"/>
        <a-select-option v-for="item in daySelectItems" :key="item.value" :value="item.value">{{ item.label }}
        </a-select-option>
        <div slot="dropdownRender" slot-scope="menu">
          <v-nodes :vnodes="menu"/>
          <a-divider style="margin: 4px 0;"/>
          <a-space style="padding: 4px 8px" >
            <a-input placeholder="请输入天数" v-model="days" @click="e=>e.target.focus()"/>
            <a-button type="primary" @click="addItem">添加</a-button>
          </a-space>
        </div>
      </a-select>
    </div>
<template>

<script>
export default {
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      days: '',
      selectOpen: false,
      daySelectItems: [{ value: '7', label: '最近 7 天' },
        { value: '14', label: '最近 14 天' },
        { value: '30', label: '最近 30 天' },
        { value: '90', label: '最近 90 天' },
        { value: '', label: '全部时间' }
      ]
    }
  },
  methods: {
    handleChange(value) {
      console.log('change', value);
      this.selectOpen = false
      // TODO 发请求获取数据
    },
    addItem() {
      if (this.days === '') {
        this.$message.error('请输入天数');
        return;
      }
      //正则匹配正整数
      if (!/^[1-9]\d*$/.test(this.days)) {
        this.$message.error('请输入正整数');
        this.days = ''
        return;
      }
      // 重复的提示
      if (this.daySelectItems.some(item => item.value == this.days)) {
        this.$message.info('已包含此选项');
        return;
      }
      this.daySelectItems.push({ value: this.days.toString(), label: `最近 ${this.days} 天` });
      this.days = '';
    },
    async handleSelectMouseDown(e) {
      if (e.target.closest('.anticon')) return; // 解决点击图标时，不触发下拉框的展开的问题
      e.preventDefault()
      this.selectOpen = true
    },
    selectIconClick() {
      this.selectOpen = !this.selectOpen
    }
  }
}

<style lang="less" scoped>
// 解决弹出框闪烁的问题
/deep/ .ant-dropdown {
  pointer-events: auto!important;//确保了元素可以响应鼠标事件
  opacity: 1!important;//下拉菜单设置为完全不透明，避免透明度变化引起闪烁
}
/deep/ .slide-up-enter, .slide-up-appear {
  animation-duration: 0s;//动画持续时间为0
}
</style>
```

## 问题整理和解决

### 图标点击展开收缩失效

### 图标箭头旋转失效

```less
&-open {
    .@{select-prefix-cls}-arrow {
      &-icon svg {
        transform: rotate(180deg);
      }
    }
    .@{select-prefix-cls}-selection {
      .active();
    }
  }
```

### 解决弹出框闪烁的问题

```less
/deep/ .ant-dropdown {
  pointer-events: auto!important;//确保了元素可以响应鼠标事件
  opacity: 1!important;//下拉菜单设置为完全不透明，避免透明度变化引起闪烁
}
/deep/ .slide-up-enter, .slide-up-appear {
  animation-duration: 0s;//动画持续时间为0
}
```
