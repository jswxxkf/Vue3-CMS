<template>
  <div class="nav-header">
    <i
      class="custom-fold"
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="handleFoldClicked"
    ></i>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserInfo from './UserInfo.vue'
import HyBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'

export default defineComponent({
  emits: ['foldChanged'],
  components: { UserInfo, HyBreadcrumb },
  setup(_, { emit }) {
    const isFold = ref(false)
    const handleFoldClicked = () => {
      isFold.value = !isFold.value
      emit('foldChanged', isFold.value)
    }
    // 面包屑的数据
    const breadcrumbs: IBreadcrumb[] = []

    return {
      isFold,
      handleFoldClicked,
      breadcrumbs,
    }
  },
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .custom-fold {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
