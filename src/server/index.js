import axios from 'axios'

// 定义ajax请求头，timeout请求时间超过8000毫秒抛出错误
const ajax = axios.create({
  baseURL: "/api",
  timeout: 8000,
  // 申明传输类型，
  headers: { "content-type": "application/json" }
})


ajax.interceptors.request.use((config) => {
  if (sessionStorage.getItem('token')) {
    // 每一次请求都得携带上登录返回回来的token与后台token做比对，如果不同后台不返回数据
    config.headers["token"] = sessionStorage.getItem('token')
  }
  return config
})

ajax.interceptors.response.use((response) => {
  return response
})

export default ajax