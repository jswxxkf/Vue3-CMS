<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// defineComponent就是为了配合TS做类型检查及约束，其定义了很多泛型(包括默认值)
// 且返回 DefineComponent类型
export default defineComponent({
  name: 'App',
  components: {},
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
