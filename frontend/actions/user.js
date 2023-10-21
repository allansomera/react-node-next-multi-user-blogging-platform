import axios from 'axios'
import { API } from 'config'
import queryString from 'query-string'

export const userPublicProfile = (username) => {
  return axios
    .get(`${API}/api/user/${username}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error.message)
    })
}

export const all_user_paths = () => {
  return axios
    .get(`${API}/api/users`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error.message)
    })
}

export const getProfile = (token) => {
  return axios
    .get(`${API}/api/user/profile`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error.message)
    })
}

export const update = (token, user) => {
  console.log('update(): ', user)

  let reqOptions = {
    url: `${API}/api/user/update`,
    method: 'PUT',
    data: user,
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  return axios
    .request(reqOptions)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error.message)
    })
}
