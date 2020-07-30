const mutations = {
  changeName(state, name) {
    name == 'OFF' ? state.name = 'ON' : state.name = 'OFF'
  },
  // 设置token
  setToken(state, token) {
    sessionStorage.setItem("token", token);
    state.token = sessionStorage.getItem("token")
  },
  // 退出登录清空token
  removeToken(state) {
    sessionStorage.removeItem("token");
    state.token = null
  },
  // 当前路由记录
  setCurrentRouter(state, router) {
    state.currentRouter = router
  },
  // 设置表格动态高度
  setSetUpRightHeight(state, height) {
    state.setUpRightHeight = height
  }
}

export default mutations