import axios from 'axios'
import { API } from 'config'
import { handleResponse } from './auth'

export const create = (category, token) => {
  // let { email, password } = user
  return axios
    .post(
      `${API}/api/category`,
      {
        name: category,
      },
      {
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log('create category response', response)
      // console.log('resonpose.data', response.data)
      return response
    })
    .catch((err) => {
      console.log('actions auth axios error:', err.message)
      console.log('auth error:', err)
      handleResponse(err.response)
      return err.message
    })
}

export const getCategories = () => {
  return axios
    .get(`${API}/api/categories`)
    .then((response) => {
      return response.data
    })
    .catch((error) => console.log(error))
}

export const singleCategory = (slug) => {
  return axios
    .get(`${API}/api/category/${slug}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => console.log(error))
}

export const removeCategory = (slug, token) => {
  return axios
    .delete(`${API}/api/category/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      handleResponse(response)
      return response.data
    })
    .catch((error) => {
      handleResponse(err.response)
      console.log(error.message)
    })
}
