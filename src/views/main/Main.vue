<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapsed ? '60px' : '210px'">
        <nav-menu :collapsed="isCollapsed" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChanged="handleFoldChanged" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/navMenu/index'
import NavHeader from '@/components/navHeader/index'

export default defineComponent({
  components: { NavMenu, NavHeader },
  setup() {
    const isCollapsed = ref(false)
    const handleFoldChanged = (isFold: boolean) => {
      isCollapsed.value = isFold
    }
    return { isCollapsed, handleFoldChanged }
  },
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .main-content {
    height: 100%;
    .page {
      height: 100%;
      .page-content {
        height: calc(100% - 48px);
        .page-info {
          border-radius: 5px;
          background-color: #ffffff;
        }
      }
    }
  }
}
.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 280px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE10 */
  &::-webkit-scrollbar {
    display: none;
  }
}
.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}
.el-header {
  height: 48px !important;
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
