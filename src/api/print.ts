import service from '@/utils/request.js'
import { ResponseData } from '@/utils/request.js'

export function getTable() {
  return service.request<any, ResponseData>({
    url: '/vue-admin-template/table/list',
    method: 'get'
  })
}

export function getArticle() {
  return service.request<any, ResponseData>({
    url: '/vue-element-admin/article/list',
    method: 'get'
  })
}
