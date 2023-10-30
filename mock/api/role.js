import Mock from 'mockjs'
import { deepClone } from '../utils'
import { asyncRoutes, constantRoutes } from '../model/routes'

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = {
  'admin-token': {
    key: 'admin',
    name: 'admin',
    description: '超级管理员。 有权查看所有页面。',
    routes: routes
  },
  'editor-token': {
    key: 'editor',
    name: 'editor',
    description: '编辑者。',
    routes: routes.filter(i => i.path === 'auth')// just a mock
  },
  'visitor-token': {
    key: 'visitor',
    name: 'visitor',
    description: '访客。',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
}

export default [
  // mock get all routes form server
  {
    url: '/vue-element-admin/routes',
    type: 'get',
    response: _ => {
      const route = roles[_.query.role]?.routes || routes
      return {
        code: 2000,
        data: route,
        result: route
      }
    }
  },

  // mock get all roles form server
  {
    url: '/vue-element-admin/roles',
    type: 'get',
    response: _ => {
      return {
        code: 2000,
        data: roles,
        result: roles
      }
    }
  },

  // add role
  {
    url: '/vue-element-admin/role',
    type: 'post',
    response: {
      code: 2000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 2000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 2000,
      data: {
        status: 'success'
      }
    }
  }
]
