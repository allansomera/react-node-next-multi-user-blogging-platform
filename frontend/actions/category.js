import axios from 'axios'
import { API } from 'config'

export const create = (category, token) => {
  // let { email, password } = user
  return axios
    .post(
      `${API}/api/category`,
      {
        category,
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
      console.log('resonpose.data', response.data)
      return response
    })
    .catch((err) => {
      console.log('actions auth axios error:', err.response.data)
      return err.response.data
    })
}

export const getCategories = () => {
  return axios
    .get(`${API}/api/categories`)
    .then((response) => {
      return response.status(200).json()
    })
    .catch((error) => console.log(error))
}

export const singleCategory = (slug) => {
  return axios
    .get(`${API}/api/category/${slug}`)
    .then((response) => {
      return response.status(200).json()
    })
    .catch((error) => console.log(error))
}

export const removeCategory = (slug) => {
  return axios
    .delete(`${API}/api/category/${slug}`)
    .then((response) => {
      return response.status(200).json()
    })
    .catch((error) => console.log(error))
}
