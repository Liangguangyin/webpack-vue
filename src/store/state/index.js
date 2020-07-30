import store from '../index'

const state = {
  name: 'OFF',
  token: sessionStorage.getItem("token"),
  currentRouter: {},
  setUpRightHeight: 0,
}

export default state