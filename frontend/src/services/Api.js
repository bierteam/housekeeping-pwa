import axios from 'axios'
import store from '../store'

export default (method, uri) => {
  // const instance = axios.create({
  //   baseURL: 'api/v1/',
  //   headers: {
  //     common: {
  //       Authorization: store.state.jwt ? 'Bearer ' + store.state.jwt : ''
  //     }
  //   }
  // })
  const instance = axios.create()
  instance.baseURL = 'api/v1/'
  if (store.state.jwt) {
    instance.headers.common.Authorization = store.state.jwt
  }

  instance.interceptors.response.use(function (response) { // intercept all responses and check for 401's
    return response
  }, function (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // add retry flag so we don't create a loop
      return axios.get('api/v1/user/refresh') // don't send anything because we rely on the refresh cookie
        .then((response) => {
          store.commit('saveJWT', response.data)
          originalRequest.headers.Authorization = 'Bearer ' + response.data // set new jwt in old request
          return axios(originalRequest) // try a second time
        })
    }
    return Promise.reject(error)
  })

  return instance
}
