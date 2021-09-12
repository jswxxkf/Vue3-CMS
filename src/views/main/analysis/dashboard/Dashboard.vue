<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount" />
        </hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品销量"></hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量(玫瑰图)"></hy-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <hy-card title="分类商品的销量"></hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品的收藏"></hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import HyCard from '@/base-ui/card'
import { PieEchart } from '@/components/pageEcharts'

export default defineComponent({
  name: 'Dashboard',
  components: { HyCard, PieEchart },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    return {
      categoryGoodsCount,
    }
  },
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>
