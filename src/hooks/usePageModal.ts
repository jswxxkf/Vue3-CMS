import { ref } from 'vue'
import PageModal from '@/components/pageModal'

type CallbackFn = (item?: any) => void

export function usePageModal(createCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const handleCreateData = () => {
    // 新建数据，将之前编辑时回显的值手动清空
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    createCb && createCb()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }
  return [pageModalRef, defaultInfo, handleCreateData, handleEditData]
}
