<template>
  <div class="app">
    <router-view></router-view>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

// defineComponent就是为了配合TS做类型检查及约束，其定义了很多泛型(包括默认值)
// 且返回 DefineComponent类型
export default defineComponent({
  name: 'App',
  components: { ElButton },
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
