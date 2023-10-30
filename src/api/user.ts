import { getToken } from '@/utils/auth'
import service from '@/utils/request.js'
import { ResponseData } from '@/utils/request.js'

// const isMock = import.meta.env.VITE_MOCK

export function login(data: { username: string, password: string }) {
  return service.request<any, ResponseData>({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return service.request<any, ResponseData>({
    url: `/vue-admin-template/user/info?role=${getToken()}`,
    method: 'get'
  })
}

export function getRoutes() {
  return service.request<any, ResponseData>({
    url: `/vue-element-admin/routes?role=${getToken()}`,
    method: 'get'
  })
}

export function logout() {
  return service.request<any, ResponseData>({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getRoles() {
  return service.request<any, ResponseData>({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}
