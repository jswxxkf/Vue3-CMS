<template>
  <div class="menu">
    <page-content :contentTableConfig="contentTableConfig" pageName="menu" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// config
import { contentTableConfig } from './config/content.config'
// sub cpn
import PageContent from '@/components/pageContent'

export default defineComponent({
  name: 'Menu',
  components: { PageContent },
  setup() {
    return {
      contentTableConfig,
    }
  },
})
</script>

<style scoped></style>
