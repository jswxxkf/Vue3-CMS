import type { ILoginState } from './login/type'
export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  login: ILoginState
}

// 导出根状态与子模块状态类型的交叉类型
export type IStoreType = IRootState & IRootWithModule
