<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClicked="handleResetClick"
      @queryBtnClicked="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @createBtnClicked="handleCreateData"
      @editBtnClicked="handleEditData"
    />
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
      :modal-config="modalConfigRef"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
// cpn configs
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
// sub cpn
import PageSearch from '@/components/pageSearch/'
import PageContent from '@/components/pageContent'
import PageModal from '@/components/pageModal'
// hooks
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'

export default defineComponent({
  components: { PageSearch, PageContent, PageModal },
  name: 'user',
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    // pageModal相关hook逻辑
    // 处理密码的逻辑
    const createCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }
    // 2. 动态添加部门和角色列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.name }
      })
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.name }
      })
      return modalConfig
    })
    // 3. 调用hook获取公共变量和函数
    const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
      usePageModal(createCallback, editCallback)
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      defaultInfo,
      handleCreateData,
      handleEditData,
    }
  },
})
</script>

<style scoped lang="less"></style>
