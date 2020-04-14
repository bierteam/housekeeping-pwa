import axios from 'axios'

export default (method, uri) => {
  return axios.create({
    baseURL: 'api/v1/'
  })
}
