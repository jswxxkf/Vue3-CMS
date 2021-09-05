<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClicked="handleResetClicked"
      @queryBtnClicked="handleQueryClicked"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// cpn configs
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
// sub cpn
import PageSearch from '@/components/pageSearch/'
import PageContent from '@/components/pageContent'
// hooks
import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
  components: { PageSearch, PageContent },
  name: 'user',
  setup() {
    const [pageContentRef, handleResetClicked, handleQueryClicked] =
      usePageSearch()
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClicked,
      handleQueryClicked,
    }
  },
})
</script>

<style scoped lang="less"></style>
