<template>
  <div class="nav-header">
    <i
      class="custom-fold"
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="handleFoldClicked"
    ></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['foldChanged'],
  setup(_, { emit }) {
    const isFold = ref(false)
    const handleFoldClicked = () => {
      isFold.value = !isFold.value
      emit('foldChanged', isFold.value)
    }
    return {
      isFold,
      handleFoldClicked,
    }
  },
})
</script>

<style scoped lang="less">
.nav-header {
  .custom-fold {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
