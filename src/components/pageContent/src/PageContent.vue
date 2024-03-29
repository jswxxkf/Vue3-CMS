<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1. Header中插槽(仅具名插槽) -->
      <template #headerOper>
        <el-button
          v-if="isCreate"
          type="primary"
          size="small"
          @click="handleCreateClick"
          >{{ createBtnTitle }}</el-button
        >
      </template>
      <!-- 2. 列中插槽(具名作用域插槽 named scoped slot)-->
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
      <template #oper="scope">
        <div class="oper-btns">
          <el-button
            v-if="isUpdate"
            icon="el-icon-edit"
            size="mini"
            type="text"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            icon="el-icon-delete"
            size="mini"
            type="text"
            @click="handleItemDeleted(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 3. 剩余的列中插槽(动态具名作用域插槽 dynamic named scoped slot)，若无slotName，则使用Table.vue中给的默认值 -->
      <!--    同时给父组件预留具名作用域插槽，由父组件插入 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
// sub cpn
import HyTable from '@/base-ui/table'
// hooks
import { useStore } from '@/store'
import { usePermission } from '@/hooks/usePermission'
// utils
import { mapPageNames } from '@/utils/mapMenus'

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
  emits: ['createBtnClicked', 'editBtnClicked'],
  setup(props, { emit }) {
    const store = useStore()
    // 获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')
    // 双向绑定pageInfo
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10,
    })
    // 动态决定新建按钮名称
    const createBtnTitle = `新建${mapPageNames(props.pageName)}`
    // 侦听pageInfo(pagination决定)的改变，重新发送网络请求
    watch(pageInfo, () => getPageData())
    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return // 无搜索权限
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          ...queryInfo,
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
        },
      })
    }
    // setup()完全可以替代beforeCreate()和onCreate()，
    // 故相当于是在onCreate()中发送网络请求
    getPageData()
    // 从vuex中获取数据
    const dataList = computed(() => {
      return store.getters['system/pageListData'](props.pageName)
    })
    const dataCount = computed(() => {
      return store.getters['system/pageListCount'](props.pageName)
    })
    // 获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'oper') return false
        return true
      }
    )
    // 删除操作处理
    const handleItemDeleted = (item: any) => {
      console.log(item)
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id,
      })
    }
    // 新建与编辑操作处理，实际逻辑写在父组件调用的hook(usePageModal)中
    const handleCreateClick = () => {
      emit('createBtnClicked')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClicked', item)
    }
    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleItemDeleted,
      handleCreateClick,
      handleEditClick,
      createBtnTitle,
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
