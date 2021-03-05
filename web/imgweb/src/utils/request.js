import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'
// export const host_url = Settings.ApiHostUrl || ''

// create an axios instance
const service = axios.create({
  // baseURL: host_url, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: Settings.timeout // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (process.env.NODE_ENV === 'development'/*  && config.line === false */) {
      config.baseURL = ''
    }

    if (store.getters.token) {
      // let each request carry token
      // ['token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['Authorization'] = 'Bearer ' + getToken()
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
    const status = response.status
    if (status < 200 || status > 300) {
      Message.error({
        message: response.message
      })
      return Promise.reject(response)
    } else {
      const res = response.data
      // if the custom code is not 0, it is judged as an error.
      if (res.hasOwnProperty('status') && res.status !== 200) {
        Message({
          message: res.errmsg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })

        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        /* if (res.status === 403) {
          // to re-login
          MessageBox.confirm('您已注销，您可以选择取消停留在当前页上，或者重新登录', '确认退出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        } */
        return Promise.reject(res)
      } else {
        return res
      }
    }
  },
  error => {
    console.log('err', error) // for debug
    const status = error.response.status
    let errno = 0
    let errMsg = ''
    try {
      errno = error.response.data.status
      errMsg = error.response.data.errmsg || error.message
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        Message.error({
          title: '网络请求超时',
          duration: 5000
        })
        return Promise.reject(error)
      }
    }
    if (status === 403) {
      // to re-login
      MessageBox.confirm('您的账号登录状态已过期，您可以停留在当前页上，或者重新登录', '确认退出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else if (errno) {
      Message.error({
        message: errMsg,
        duration: 5 * 1000
      })
      /* if (errno === 401) {
      } else if (errno === 403) {
      } else {
        if (errMsg !== undefined) {
          Message.error({
            title: errMsg,
            duration: 5000
          })
        }
      } */
    } else {
      Message.error({
        title: '接口请求失败',
        duration: 5000
      })
    }

    return Promise.reject(error)
  }
)

export default service
