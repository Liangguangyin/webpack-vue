
import axios from 'axios'

class httpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: 8000, // 超时时间 可自定义其他配置
      headers: { "content-type": "application/json" }
    }
    return config
  }
  interceptors(instance) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      if (sessionStorage.getItem('token')) {
        // 每一次请求都得携带上登录返回回来的token与后台token做比对，如果不同后台不返回数据
        config.headers["token"] = sessionStorage.getItem('token')
      }
      return config
    }, error => {
      // 请求错误处理
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      return res
      //   const { data, status } = res
      //   return { data, status }
      // }, error => {
      //   let info = {}
      //   let { status, statusText, data } = error.response
      //   if (!error.response) {
      //     info = {
      //       code: 5000,
      //       msg: 'Network Error'
      //     }
      //   } else {
      //     // 此处整理错误信息格式
      //     info = {
      //       code: status,
      //       data: data,
      //       msg: statusText
      //     }
      //   }
      //   return Promise.reject(info)
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default httpRequest