<template>
  <div class="page-content">
    <hy-table :listData="dataList" v-bind="contentTableConfig">
      <!-- 1. Header中插槽 -->
      <template #headerOper>
        <el-button type="primary" size="small">新建用户</el-button>
      </template>
      <!-- 2. 列中插槽 -->
      <template #status="scope">
        <el-tag size="small" :type="scope.row.enable ? 'success' : 'danger'">{{
          scope.row.enable ? '已启用' : '已冻结'
        }}</el-tag>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #oper>
        <div class="oper-btns">
          <el-button icon="el-icon-edit" size="mini" type="text"
            >编辑</el-button
          >
          <el-button icon="el-icon-delete" size="mini" type="text"
            >删除</el-button
          >
        </div>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import HyTable from '@/base-ui/table'

export default defineComponent({
  components: { HyTable },
  props: {
    contentTableConfig: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10,
      },
    })
    const dataList = computed(() => {
      return store.getters['system/pageListData'](props.pageName)
    })
    const usersCount = computed(() => store.state.system.usersCount)
    return {
      dataList,
      usersCount,
    }
  },
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
  .el-tag {
    user-select: none;
    cursor: default;
  }
}
</style>
