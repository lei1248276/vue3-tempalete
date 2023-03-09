export interface ResponseData {
  result: any
}

let userStore:ReturnType< typeof useUserStore>

let Loading: ReturnType<typeof ElLoading.service>

function loadingStart() {
  Loading && Loading.close()
  Loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'transparent'
  })
}

console.log('%c🚀 ~ file: request ~', 'color: #F25F5C;font-weight: bold;', import.meta.env.VITE_BASE_API)

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_MOCK ? import.meta.env.VITE_MOCK_API : import.meta.env.VITE_BASE_API, // url = base url + request url
  // withCredentials: import.meta.env.NODE_ENV !== 'development', // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    loadingStart()
    userStore || (userStore = useUserStore())
    // do something before request is sent

    if (config.headers && userStore.token) {
      // let each request carry token
      // ['token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = userStore.token
      // console.log(config);
    }
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
    const { code, message } = response.data
    Loading.close()

    // if the custom code is not 20000, it is judged as an error.
    if (code !== '2000') {
      ElMessage({
        message: message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50014: Token expired;
      if (code === '50014') {
        // to re-login
        ElMessageBox.confirm('账号已退出，您可以继续停留在此页面，或重新登录', '确认退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userStore.resetToken()
          location.reload()
        })
      }

      return Promise.reject(new Error(message || 'Error'))
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    Loading.close()

    return Promise.reject(error)
  }
)

export default service

