import setUpChild from '@/view/setUp/config.js'
const config = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
      grade: 1, // 等级一级是菜单， 暂时没有二级菜单
      id: '1' // id 一定为字符串，要不然会有警告
    },
    component: () => import('@/view/homePage')
  },
  {
    path: '/setUp',
    name: 'setUp',
    meta: {
      title: '设置',
      grade: 1, // 等级一级是菜单， 暂时没有二级菜单
      id: '2' // id 一定为字符串，要不然会有警告
    },
    children: setUpChild,
    component: () => import('@/view/setUp')
  },
  {
    path: '/saveInformation',
    name: 'saveInformation',
    meta: {
      title: '数据保存信息',
      grade: 1, // 等级一级是菜单， 暂时没有二级菜单
      id: '3' // id 一定为字符串，要不然会有警告
    },
    component: () => import('@/view/saveInformation')
  },
  {
    path: '/saveExpression',
    name: 'saveExpression',
    meta: {
      title: '表达式保存',
      grade: 1,
      id: '4'
    },
    component: () => import('@/view/saveExpression')
  },
  {
    path: '/seniorInspect',
    name: 'seniorInspect',
    meta: {
      title: '高级检索',
      grade: 1,
      id: '5'
    },
    component: () => import('@/view/seniorInspect')
  },
  {
    path: '/useTotal',
    name: 'useTotal',
    meta: {
      title: '使用量统计',
      grade: 1,
      id: '6'
    },
    component: () => import('@/view/useTotal')
  },
  {
    path: '/hotWords',
    name: 'hotWords',
    meta: {
      title: '热词统计',
      grade: 1,
      id: '7'
    },
    component: () => import('@/view/hotWords')
  },
  {
    path: '/feedBack',
    name: 'feedBack',
    meta: {
      title: '反馈',
      grade: 1,
      id: '8'
    },
    component: () => import('@/view/feedBack')
  },
  {
    path: '/optionHelp',
    name: 'optionHelp',
    meta: {
      title: '帮助',
      grade: 1,
      id: '9'
    },
    component: () => import('@/view/optionHelp')
  },
  {
    path: '/jurisdictionInformation',
    name: 'jurisdictionInformation',
    meta: {
      title: '权限信息',
      grade: 1,
      id: '10'
    },
    component: () => import('@/view/jurisdictionInformation')
  },
  {
    path: '/searchDataView',
    name: 'searchDataView',
    meta: {
      title: '搜索数据视图',
      grade: 4, // 等级为4是不显示字段路由
      id: '1-1'
    },
    component: () => import('@/view/searchDataView')
  }
]

export default config