import { useStore } from '@/store'

export function usePermission(pageName: string, handlerName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handlerName}`
  return !!permissions.find((item) => item === verifyPermission)
}
