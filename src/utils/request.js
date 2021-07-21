/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'

// axios()
// axios.get()
// axios.post()

// 创建一个 axios 实例，说白了就是复制了一个 axios

// const req1 = axios.create()
// req1.defaults.baseURL = 'http://172.16.3.242'
// const req2 = axios.create()
// req2.defaults.baseURL = 'http://172.0.0.1'
// 要统一写法
// req1({
//   method: "GET",
//   url: 'xxx'
// })

// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' // 最新接口地址

  // baseURL: 'http://ttapi.research.itcast.cn/' // 请求的基础路径
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
  // 在发送请求之前做些什么
    const user = JSON.parse(window.localStorage.getItem('user'))

    console.log(user)
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
  // 对请求错误做些什么
    return Promise.reject(error)
  })

//  响应拦截器

// 导出请求方法
export default request

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })
