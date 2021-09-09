<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @createBtnClicked="handleCreateData"
      @editBtnClicked="handleEditData"
    />
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      :modalConfig="modalConfig"
      pageName="role"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue'
// config
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'
// sub cpn
import { ElTree } from 'element-plus'
import PageContent from '@/components/pageContent'
import PageSearch from '@/components/pageSearch'
import PageModal from '@/components/pageModal'
// hooks
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'
// utils
import { mapMenuToLeafKeys } from '@/utils/mapMenus'

export default defineComponent({
  name: 'Role',
  components: { PageContent, PageSearch, PageModal },
  setup() {
    // 1. 处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = mapMenuToLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
      usePageModal(undefined, editCallback)
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList: menuList }
    }
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleCreateData,
      handleEditData,
      otherInfo,
      menus,
      handleCheckChange,
      elTreeRef,
    }
  },
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 50px;
}
</style>
