<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-remove" @click="handleLogoutClick"
            >退出登录</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-user" divided
            >用户信息</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-setting">系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { computed, defineComponent } from 'vue'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)
    const router = useRouter()
    const handleLogoutClick = () => {
      localCache.deleteCache('token')
      router.push('/main')
    }
    return {
      name,
      handleLogoutClick,
    }
  },
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  .el-avatar {
    margin-right: 10px;
  }
}
</style>
