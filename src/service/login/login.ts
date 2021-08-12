import hyRequest from '../index'
import { IAccount, IDataType, ILoginResult } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法 /users/id
  UserMenus = '/role/', // 用法 role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
  })
}

export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    // loading加载图层只需一个即可
    showLoading: false,
  })
}

export function requestUserMenusByRoleId(roleId: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + roleId + '/menu',
    showLoading: false,
  })
}
