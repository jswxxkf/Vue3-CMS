<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        />
      </template>
      <template #newPrice="scope">{{ '￥' + scope.row.newPrice }}</template>
      <template #oldPrice="scope">{{ '￥' + scope.row.oldPrice }}</template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/pageContent'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'Goods',
  components: { PageContent },
  setup() {
    return {
      contentTableConfig,
    }
  },
})
</script>

<style scoped></style>
