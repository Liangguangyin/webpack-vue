import httpserver from './api.request'

let httpConfig = {
  get: (url, params = null) => {
    httpserver.request({
      url: url,
      method: 'get',
      params: params
    })
  },
  post: (url, params = null) => {
    return httpserver.request({
      url: url,
      method: 'post',
      params: params
    })
  }
}



export default httpConfig