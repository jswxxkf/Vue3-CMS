<template>
  <div class="list">
    <page-content :contentTableConfig="contentTableConfig" pageName="story" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/pageContent'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'List',
  components: { PageContent },
  setup() {
    return {
      contentTableConfig,
    }
  },
})
</script>

<style scoped></style>
