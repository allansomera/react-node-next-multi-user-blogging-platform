import axios from 'axios'
import { API } from 'config'

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
      console.log('resonpose', response)
      // console.log('resonpose.data', response.data)
      return response
    })
    .catch((err) => {
      console.log('actions auth axios error:', err.message)
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
      return response.json()
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
      return response.data
    })
    .catch((error) => console.log(error.message))
}
