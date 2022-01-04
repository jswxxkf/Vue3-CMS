<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h3 class="header">高级检索</h3>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button
            icon="el-icon-set-up"
            size="medium"
            @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            size="medium"
            @click="handleQuery"
            >搜索</el-button
          >
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'

export default defineComponent({
  emits: ['resetBtnClicked', 'queryBtnClicked'],
  props: {
    searchFormConfig: {
      type: Object,
      required: true,
    },
  },
  components: { HyForm },
  setup(props, { emit }) {
    // 优化1：formData中的属性应该动态决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    // 优化2：当用户点击重置
    const handleResetClick = () => {
      for (const key in formOriginData) {
        // 由于Form.vue中，formData拿到的是这里的浅拷贝，
        // 故修改某个键对应的值会引起浅拷贝后对象的变化
        formData.value[`${key}`] = formOriginData[key]
      }
      emit('resetBtnClicked')
    }
    // 优化3：当用户点击搜索
    const handleQuery = () => {
      emit('queryBtnClicked', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQuery,
    }
  },
})
</script>

<style scoped lang="less">
.header {
  margin: 0 0 20px 0;
  padding-left: 20px;
  text-align: left;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
