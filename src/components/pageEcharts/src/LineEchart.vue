<template>
  <div class="line-echart">
    <base-echart :options="options" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, withDefaults } from 'vue'
import BaseEchart from '@/base-ui/echart'

const props = withDefaults(
  defineProps<{
    title?: string
    xLabels: string[]
    values: any[]
  }>(),
  {
    title: '',
  }
)

const options = computed(() => ({
  title: {
    text: props.title,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {},
  toolbox: {
    feature: {
      saveAsImage: { show: true },
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: props.xLabels,
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '各自销量',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: props.values,
    },
  ],
}))
</script>

<style scoped></style>
