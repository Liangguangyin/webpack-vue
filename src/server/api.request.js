import HttpRequest from './axios'

const baseUrl = process.env.NODE_ENV === 'development' ? '/api' : 'http://192.168.0.24:8081'
const axios = new HttpRequest(baseUrl)
export default axios