const mutations = {
  changeName(state, name) {
    name == 'OFF' ? state.name = 'ON' : state.name = 'OFF'
  }
}

export default mutations