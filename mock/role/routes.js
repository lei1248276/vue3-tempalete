// Just a mock data

const constantRoutes = []

const asyncRoutes = [
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
      path: 'admin',
      title: '管理员'
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
  }

  /* {
    path: 'permission',
    children: [{
      path: 'permission/role',
      title: '角色管理'
    }, {
      path: 'permission/user',
      title: '用户管理'
    }]
  },

  {
    path: 'doctorManage',
    title: '医生管理',
    children: [{
      path: 'doctorManage/register',
      title: '医生注册审核'
    }, {
      path: 'doctorManage/onlineDoctor',
      title: '线上医生列表'
    }, {
      path: 'doctorManage/discount',
      title: '医生价格组维护'
    }]
  },

  {
    path: 'salesManage',
    title: '销售管理',
    children: [{
      path: 'salesManage/goods',
      title: '商品管理'
    }, {
      path: 'salesManage/combo',
      title: '套餐管理'
    }]
  },

  {
    path: 'areaManage',
    title: '大区管理',
    children: [{
      path: 'areaManage/areaInfo',
      title: '大区信息管理'
    }, {
      path: 'areaManage/areaPrice',
      title: '大区价格组维护'
    }]
  },

  {
    path: 'agentManage',
    title: '代理商管理',
    children: [{
      path: 'agentManage/agentCheck',
      title: '代理商审核'
    }, {
      path: 'agentManage/onlineAgent',
      title: '线上代理商'
    }]
  },

  {
    path: 'orderManage',
    title: '订单管理',
    children: [{
      path: 'orderManage/order',
      title: '订单列表'
    }, {
      path: 'orderManage/refund',
      title: '退款申请列表'
    }]
  },

  {
    path: 'reportManage',
    title: '报表管理',
    children: [{
      path: 'reportManage/orderReport',
      title: '订单报表分析'
    }]
  },

  {
    path: 'splitAccountManage',
    title: '分账管理',
    children: [{
      path: 'splitAccountManage/splitAccountCheck',
      title: '分账审批'
    }]
  },

  {
    path: 'forumManage',
    title: '论坛管理',
    children: [{
      path: 'forumManage/article',
      title: '文章列表'
    }, {
      path: 'forumManage/video',
      title: '视频列表'
    }, {
      path: 'forumManage/expert',
      title: '专家列表'
    }]
  }*/
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
