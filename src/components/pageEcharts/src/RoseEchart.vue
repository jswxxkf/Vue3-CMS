<template>
  <div class="rose-echart">
    <base-echart :options="options" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import BaseEchart from '@/base-ui/echart'
// types
import type { IDataType } from '../types'

const props = defineProps<{
  roseData: IDataType
}>()

const options = computed(() => ({
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: true },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: '分类商品数量',
      type: 'pie',
      radius: [10, 100],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
      },
      data: props.roseData,
    },
  ],
}))
</script>

<style scoped></style>
