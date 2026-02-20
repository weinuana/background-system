//统一管理项目用户相关的接口
import request from '@/utils/request'
import type { loginFrom, loginResponseData, userInfoReponseData } from './type'

//统一管理接口

enum API {

    LOGIN_URL = '/user/login',

    USERINFO_URL = '/user/info',

    LOGOUT_URL = '/admin/acl/index/logout',

}
//暴露登录接口
export const reqLogin = (data: loginFrom) =>
    request.post<any, loginResponseData>(API.LOGIN_URL, data)

//获取用户信息
export const reqUserInfo = () =>
    request.get<any, userInfoReponseData>(API.USERINFO_URL)

//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)