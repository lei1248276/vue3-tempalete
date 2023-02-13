import service from '@/utils/request.js'
import { ResponseData } from '@/utils/request.js'

const isMock = import.meta.env.VITE_MOCK

export function login(data: { username: string, password: string }) {
  return service.request<any, ResponseData>({
    url: isMock ? '/vue-admin-template/user/login' : '/server-user/user/web/sysuser/syslogin',
    method: 'post',
    data
  })
}

export function getInfo() {
  return service.request<any, ResponseData>({
    url: isMock ? '/vue-admin-template/user/info' : '/server-user/user/web/sysuser/getUserInfo',
    method: 'get'
  })
}

export function getRoutes() {
  return service.request<any, ResponseData>({
    url: isMock ? '/vue-element-admin/routes' : '/server-user/user/web/sys_menu/findUserMenu',
    method: 'get'
  })
}

export function logout() {
  return service.request<any, ResponseData>({
    url: isMock ? '/vue-admin-template/user/logout' : '/server-user/user/web/sysuser/userExit',
    method: 'post'
  })
}

export function getAllUsers() {
  return service.request<any, ResponseData>({
    url: '/server-user/user/web/sysuser/selectBySysLogin',
    method: 'get'
  })
}

export function getUserRole(user_id: number) {
  return service.request<any, ResponseData>({
    url: '/server-user/user/web/sys_role/findUserRole',
    method: 'get',
    params: {
      user_id
    }
  })
}

export function updateUserRole(user_id: number, role_ids: number) {
  return service.request<any, ResponseData>({
    url: '/server-user/user/web/sys_role/updateUserRole',
    method: 'post',
    data: {
      user_id,
      role_ids
    }
  })
}

export function addUser(data: any) {
  return service.request<any, ResponseData>({
    url: '/server-user/user/web/sysuser/addSyslogin',
    method: 'post',
    data
  })
}
