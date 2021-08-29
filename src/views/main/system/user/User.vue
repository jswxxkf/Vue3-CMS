<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content :contentTableConfig="contentTableConfig" pageName="user" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import PageSearch from '@/components/pageSearch/'
import PageContent from '@/components/pageContent'

export default defineComponent({
  components: { PageSearch, PageContent },
  name: 'user',
  setup() {
    return {
      searchFormConfig,
      contentTableConfig,
    }
  },
})
</script>

<style scoped lang="less"></style>
