import { ref } from 'vue'
import PageContent from '@/components/pageContent'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClicked = () => {
    pageContentRef.value?.getPageData()
  }
  const handleQueryClicked = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, handleResetClicked, handleQueryClicked]
}
