// Just a mock data

export const constantRoutes = []

export const asyncRoutes = [
  {
    path: 'auth',
    title: '权限管理',
    children: [{
      path: 'role',
      title: '角色管理'
    }, {
      path: 'user',
      title: '用户管理'
    }, {
      path: 'authSwitch',
      title: '页面权限切换'
    }]
  },

  {
    path: 'nested',
    title: '嵌套',
    children: [{
      path: 'page1',
      title: '页面1'
    }, {
      path: 'nested1',
      title: '嵌套1',
      children: [{
        path: 'page2',
        title: '页面2'
      }, {
        path: 'page3',
        title: '页面3'
      }, {
        path: 'nested2',
        title: '嵌套2',
        children: [{
          path: 'page4',
          title: '页面4'
        }, {
          path: 'page5',
          title: '页面5'
        }]
      }
      ]
    }]
  },

  {
    path: 'dataScreen',
    title: '数据大屏'
  }
]
