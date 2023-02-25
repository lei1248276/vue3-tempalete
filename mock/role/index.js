const Mock = require('mockjs')
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('./routes.js')

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
    description: '编辑者。 可以看到除系统页面以外的所有页面',
    routes: routes.filter(i => i.path !== 'test')// just a mock
  },
  'visitor-token': {
    key: 'visitor',
    name: 'visitor',
    description: '访客。 只能看到主页和文档页面',
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

module.exports = [
  // mock get all routes form server
  {
    url: '/vue-element-admin/routes',
    type: 'get',
    response: _ => {
      const route = roles[_[Object.getOwnPropertySymbols(_)[1]].token].routes
      return {
        code: '2000',
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
        code: 20000,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/vue-element-admin/role',
    type: 'post',
    response: {
      code: 20000,
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
      code: 20000,
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
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
