# Element Plus 使用问题记录

## badge 徽章组件

badge 组件在 el-table中使用时候 badge-class 属性无效，看着 class 是绑定到dom上了，但是样式没有生效，

解决方案：使用 badge-style 替代

## 支持输入的下拉框

场景：如果输入的名称在下拉框列表中，就使用下拉框列表中的值，否则就使用输入的值。

不要去使用 el-select，而是使用 el-autocomplete 这个组件。

## pagination 分页组件

组件上面没有设置中文的自定义，总数和页码的文字。

解决方案：

在 element-plus 全局使用 locale 属性，设置语言为中文。
