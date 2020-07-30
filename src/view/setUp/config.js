const setUpChild = [
  {
    path: '/systemConfig',
    name: 'systemConfig',
    meta: {
      id: '2-1',
      grade: 2,
      title: '系统配置管理',
      icon: 'el-icon-s-tools',
    },
    children: [
      {
        path: '/systemConfig/tableConfig',
        name: 'tableConfig',
        meta: {
          id: '3-1-1',
          grade: 3,
          title: '系统表配置',
          icon: 'el-icon-setting',
        },
        component: () => import('@/view/setUp/systemConfig/tableConfig')
      },
      {
        path: '/systemConfig/startConstConfig',
        name: 'startConstConfig',
        meta: {
          id: '3-1-2',
          grade: 3,
          title: '启动常量配置',
          icon: 'el-icon-s-fold',
        },
        component: () => import('@/view/setUp/systemConfig/startConstConfig')
      }
    ],
    component: () => import('@/router/pubilc')
  },
  {
    path: '/authorityManage',
    name: 'authorityManage',
    meta: {
      id: '2-2',
      grade: 2,
      title: '用户权限管理',
      icon: 'el-icon-user-solid',
    },
    children: [
      {
        path: '/authorityManage/userSet',
        name: 'userSet',
        meta: {
          id: '3-2-1',
          grade: 3,
          title: '用户设置',
          icon: 'el-icon-user',
        },
        component: () => import('@/view/setUp/authorityManage/userSet')
      },
      {
        path: '/authorityManage/rolePermissions',
        name: 'rolePermissions',
        meta: {
          id: '3-2-2',
          grade: 3,
          title: '权限角色设置',
          icon: 'el-icon-s-custom',
        },
        component: () => import('@/view/setUp/authorityManage/rolePermissions')
      },

      {
        path: '/authorityManage/rowPermissions',
        name: 'rowPermissions',
        meta: {
          id: '3-2-3',
          grade: 3,
          title: '行级权限',
          icon: 'el-icon-s-unfold',
        },
        component: () => import('@/view/setUp/authorityManage/rowPermissions')
      },
      {
        path: '/authorityManage/headerManage',
        name: 'headerManage',
        meta: {
          id: '3-2-4',
          grade: 3,
          title: '表列头管理',
          icon: 'el-icon-s-order',
        },
        component: () => import('@/view/setUp/authorityManage/headerManage')
      }
    ],
    component: () => import('@/router/pubilc')
  }
]


export default setUpChild