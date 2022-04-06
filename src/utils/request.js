import axios from 'axios'
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import store from '@/store'

// ! LOADING对象（为了close）
let LOADING = null
function loadingStart() {
  LOADING && LOADING.close()
  LOADING = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'transparent',
    fullscreen: false
  })
}

console.log('%c🚀 ~ file: request ~', 'color: #F25F5C;font-weight: bold;', process.env.VUE_APP_BASE_API)

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_MOCK ? process.env.VUE_APP_MOCK_API : process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: process.env.NODE_ENV !== 'development', // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = store.getters.token
      // console.log(config);
    }
    loadingStart()
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    LOADING.close()

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== '2000') {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50014: Token expired;
      if (res.code === '50014') {
        // to re-login
        ElMessageBox.confirm('账号已退出，您可以继续停留在此页面，或重新登录', '确认退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    LOADING.close()

    return Promise.reject(error)
  }
)

export default service

