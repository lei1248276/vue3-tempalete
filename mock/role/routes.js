// Just a mock data

const constantRoutes = []

const asyncRoutes = [
  {
    component: 'test',
    title: '测试',
    children: [{
      component: 'nested',
      title: '嵌套',
      children: [{
        component: 'test/test',
        title: '角色管理'
      }, {
        component: 'test/test2',
        title: '用户管理'
      }]
    }]
  }

  /* {
    component: 'permission',
    children: [{
      component: 'permission/role',
      title: '角色管理'
    }, {
      component: 'permission/user',
      title: '用户管理'
    }]
  },

  {
    component: 'doctorManage',
    title: '医生管理',
    children: [{
      component: 'doctorManage/register',
      title: '医生注册审核'
    }, {
      component: 'doctorManage/onlineDoctor',
      title: '线上医生列表'
    }, {
      component: 'doctorManage/discount',
      title: '医生价格组维护'
    }]
  },

  {
    component: 'salesManage',
    title: '销售管理',
    children: [{
      component: 'salesManage/goods',
      title: '商品管理'
    }, {
      component: 'salesManage/combo',
      title: '套餐管理'
    }]
  },

  {
    component: 'areaManage',
    title: '大区管理',
    children: [{
      component: 'areaManage/areaInfo',
      title: '大区信息管理'
    }, {
      component: 'areaManage/areaPrice',
      title: '大区价格组维护'
    }]
  },

  {
    component: 'agentManage',
    title: '代理商管理',
    children: [{
      component: 'agentManage/agentCheck',
      title: '代理商审核'
    }, {
      component: 'agentManage/onlineAgent',
      title: '线上代理商'
    }]
  },

  {
    component: 'orderManage',
    title: '订单管理',
    children: [{
      component: 'orderManage/order',
      title: '订单列表'
    }, {
      component: 'orderManage/refund',
      title: '退款申请列表'
    }]
  },

  {
    component: 'reportManage',
    title: '报表管理',
    children: [{
      component: 'reportManage/orderReport',
      title: '订单报表分析'
    }]
  },

  {
    component: 'splitAccountManage',
    title: '分账管理',
    children: [{
      component: 'splitAccountManage/splitAccountCheck',
      title: '分账审批'
    }]
  },

  {
    component: 'forumManage',
    title: '论坛管理',
    children: [{
      component: 'forumManage/article',
      title: '文章列表'
    }, {
      component: 'forumManage/video',
      title: '视频列表'
    }, {
      component: 'forumManage/expert',
      title: '专家列表'
    }]
  }*/
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
