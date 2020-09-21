import store from '../index'

const state = {
  name: 'OFF',
  token: sessionStorage.getItem("token"),
  currentRouter: {},
  setUpRightHeight: 0,
  zIndex: 110,
}

export default state