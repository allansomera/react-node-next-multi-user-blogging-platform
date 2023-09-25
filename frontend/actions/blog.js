import axios from 'axios'
import { API } from 'config'

export const createBlog = (blog, token) => {
  // let { email, password } = user
  return axios
    .post(
      `${API}/api/blog`,
      {
        blog,
      },
      {
        headers: {
          Accept: 'application/json',
          // 'Content-Type': 'multipart/form-data',
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

export const getBlogs = () => {
  return axios
    .get(`${API}/api/blogs`)
    .then((response) => {
      return response.data
    })
    .catch((error) => console.log(error))
}

export const singleBlog = (slug) => {
  return axios
    .get(`${API}/api/blog/${slug}`)
    .then((response) => {
      return response.status(200).json()
    })
    .catch((error) => console.log(error))
}

export const removeBlog = (slug, token) => {
  return axios
    .delete(`${API}/api/blog/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => console.log(error))
}
