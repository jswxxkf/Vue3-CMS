<template>
  <div class="nav-menu">
    <div class="logo">
      <!-- template中使用别名 ~@ -->
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapsed" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :unique-opened="false"
      :collapse="collapsed"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单可以展开的标题 -->
          <el-submenu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router'
import { mapPathToMenu } from '@/utils/mapMenus'

export default defineComponent({
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    // store
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)
    // router
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path
    // data
    const menu = mapPathToMenu(userMenus.value, currentPath)
    const defaultValue = ref(menu.id + '')
    // event handler
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found',
      })
    }
    return {
      userMenus,
      handleMenuItemClick,
      defaultValue,
    }
  },
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      line-height: 1.5;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }
  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }
  &:deep(.el-submenu__title) {
    background-color: #001529 !important;
  }
  // hover 高亮
  .el-menu-item:hover {
    color: #ffffff !important; // 菜单
  }
  .el-menu-item.is-active {
    background-color: #0a60bd !important;
    color: #ffffff !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
