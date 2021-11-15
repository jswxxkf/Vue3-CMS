<template>
  <div class="descriptions">
    <el-descriptions :title="title" :column="column" border>
      <template v-for="(itemData, index) in tableData" :key="index">
        <el-descriptions-item>
          <template #label>{{ itemData.name }}</template>
          <el-tag size="small">{{ itemData.description }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Descriptions',
  props: {
    title: {
      type: String,
      default: '',
    },
    column: {
      type: Number,
      default: 1,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {}
  },
})
</script>

<style scoped lang="less">
.descriptions {
  margin-bottom: 20px;
}
</style>
