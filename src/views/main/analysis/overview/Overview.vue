<template>
  <div class="overview">
    <hy-card title="关于">
      <!-- 插到默认插槽中 -->
      <div class="c-left">
        Vue3-CMS是基于Vue3(Composition API), Vue Router, Vuex, ElementPlus,
        TypeScript, ECharts等前端内容系统解决方案
      </div>
    </hy-card>
    <hy-card title="技术栈">
      <hy-text-link :textArrs="technologyStacks"></hy-text-link>
    </hy-card>
    <hy-card title="项目目录结构">
      <div class="c-left">
        <hy-code language="bash" :code="projectDir"></hy-code>
      </div>
    </hy-card>
    <hy-card title="GIT提交规范">
      <hy-descriptions
        :column="1"
        :tableData="[
          { name: 'add 操作', description: 'git add ...' },
          { name: 'commit 操作', description: 'npm run commit' },
          { name: 'push 操作', description: 'git push ...' },
          { name: 'fetch 操作', description: 'git fetch ...' },
          { name: 'merge 操作', description: 'git merge ...' },
          { name: 'stash 操作', description: 'git stash ...' },
        ]"
      ></hy-descriptions>
    </hy-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// sub cpn
import HyCard from '@/base-ui/card'
import HyTextLink from '@/base-ui/text-link'
import HyDescriptions from '@/base-ui/descriptions'
import HyCode from '@/base-ui/code'
// configs
import { technologyStacks } from './config/techStacks'
import { projectDir } from './config/projectDir'

export default defineComponent({
  name: 'Overview',
  components: { HyCard, HyTextLink, HyDescriptions, HyCode },
  setup() {
    return {
      technologyStacks,
      projectDir,
    }
  },
})
</script>

<style scoped lang="less">
.overview {
  .c-left {
    text-align: left;
  }
  .el-card {
    margin-bottom: 20px;
    // ::v-deep(:deep) 重写 element-plus 样式
    &:deep(.el-card__header span) {
      font-weight: 700;
    }
  }
  .el-description {
    &:deep(.el-descriptions__title) {
      font-weight: 400;
    }
  }
}
</style>
