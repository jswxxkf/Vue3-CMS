<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content :contentTableConfig="contentTableConfig" pageName="role" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import PageContent from '@/components/pageContent'
import PageSearch from '@/components/pageSearch'

export default defineComponent({
  name: 'Role',
  components: { PageContent, PageSearch },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig,
    }
  },
})
</script>

<style scoped></style>
