<template>
  <div class="dashboard">
    <el-row gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量(饼图)"></hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品销量"></hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量(玫瑰图)"></hy-card>
      </el-col>
    </el-row>
    <el-row gutter="10" class="content-row">
      <el-col :span="12">
        <hy-card title="分类商品的销量">
          <base-echart :options="options" />
        </hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品的收藏"></hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import HyCard from '@/base-ui/card'
import BaseEchart from '@/base-ui/echart'

export default defineComponent({
  name: 'Dashboard',
  components: { HyCard, BaseEchart },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    const options = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    }
    return {
      options,
    }
  },
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>
