import type { ILoginState } from './login/type'
import type { ISystemState } from './main/system/type'
import type { IDashboardState } from './main/analysis/type'

export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

// 导出根状态与子模块状态类型的交叉类型
export type IStoreType = IRootState & IRootWithModule
