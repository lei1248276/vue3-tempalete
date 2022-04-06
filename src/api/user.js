import request from '@/utils/request'

const isMock = process.env.VUE_APP_MOCK

export function login(data) {
  return request({
    url: isMock ? '/vue-admin-template/user/login' : '/server-user/user/web/sysuser/syslogin',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: isMock ? '/vue-admin-template/user/info' : '/server-user/user/web/sysuser/getUserInfo',
    method: 'get'
  })
}

export function getRoutes() {
  return request({
    url: isMock ? '/vue-element-admin/routes' : '/server-user/user/web/sys_menu/findUserMenu',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: isMock ? '/vue-admin-template/user/logout' : '/server-user/user/web/sysuser/userExit',
    method: 'post'
  })
}

export function getAllUsers() {
  return request({
    url: '/server-user/user/web/sysuser/selectBySysLogin',
    method: 'get'
  })
}

export function getUserRole(user_id) {
  return request({
    url: '/server-user/user/web/sys_role/findUserRole',
    method: 'get',
    params: {
      user_id
    }
  })
}

export function updateUserRole(user_id, role_ids) {
  return request({
    url: '/server-user/user/web/sys_role/updateUserRole',
    method: 'post',
    data: {
      user_id,
      role_ids
    }
  })
}

export function addUser(data) {
  return request({
    url: '/server-user/user/web/sysuser/addSyslogin',
    method: 'post',
    data
  })
}
