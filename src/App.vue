<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

// defineComponent就是为了配合TS做类型检查及约束，其定义了很多泛型(包括默认值)
// 且返回 DefineComponent类型
export default defineComponent({
  name: 'App',
  components: { ElConfigProvider },
  setup() {
    return {
      zhCn,
    }
  },
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
