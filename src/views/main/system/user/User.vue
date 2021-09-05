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
    <page-modal ref="pageModalRef" :modal-config="modalConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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

export default defineComponent({
  components: { PageSearch, PageContent, PageModal },
  name: 'user',
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const pageModalRef = ref<InstanceType<typeof PageModal>>()
    const handleCreateData = () => {
      if (pageModalRef.value) {
        pageModalRef.value.dialogVisible = true
      }
    }
    const handleEditData = (item: any) => {
      if (pageModalRef.value) {
        pageModalRef.value.dialogVisible = true
      }
    }
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfig,
      pageModalRef,
      handleCreateData,
      handleEditData,
    }
  },
})
</script>

<style scoped lang="less"></style>
