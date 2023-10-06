import axios from 'axios'
import { API } from 'config'

export const create = (tag, token) => {
  // let { email, password } = user
  return axios
    .post(
      `${API}/api/tag`,
      {
        name: tag,
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
      // console.log('resonpose', response)
      // console.log('resonpose.data', response.data)
      return response
    })
    .catch((err) => {
      console.log('actions auth axios error:', err.message)
      return err.response.data
    })
}

export const getTags = () => {
  return axios
    .get(`${API}/api/tags`)
    .then((response) => {
      return response.data
    })
    .catch((error) => console.log(error))
}

export const singleTag = (slug) => {
  return axios
    .get(`${API}/api/tag/${slug}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => console.log(error))
}

export const removeTag = (slug, token) => {
  return axios
    .delete(`${API}/api/tag/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => console.log(error))
}
