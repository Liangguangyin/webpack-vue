import httpserver from './api.request'
import store from '@/store'

// LoadingDisplay 全局loading 需要可以传在参数后面 默认是不需要的

let httpConfig = {
  get: (url, params = null) => {
    return httpserver.request({
      url: `${url}${store.state.token.match(/"(\S*)'/)[1]}`, // 现在这个是手动带token
      method: 'get',
      params: params
    });
  },
  post: (url, params = null) => {
    return httpserver.request({
      url: `${url}${store.state.token.match(/"(\S*)'/)[1]}`,
      method: 'post',
      data: params,
    });
  }
}

// get post 请求都是封装好了的，看着参数传，写一个例子
// httpConfig.get(url, params)

export default httpConfig