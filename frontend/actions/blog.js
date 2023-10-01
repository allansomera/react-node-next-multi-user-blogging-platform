import axios from 'axios'
import { API } from 'config'

export const createBlog = (blog, token) => {
  // let { email, password } = user
  let reqOptions = {
    url: `${API}/api/blog`,
    method: 'POST',
    data: blog,
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  return (
    axios
      .request(reqOptions)
      .then((response) => {
        console.log('reqOptions', response)
        return response.data
      })
      // .then((r) => {
      //   console.log('r: ', r)
      //   return r.data
      // })
      .catch((err) => {
        console.log('actions auth axios error:', err.message)
        return err.response.data
      })
  )

  // return axios
  //   .post(
  //     `${API}/api/blog`,
  //     {
  //       // title: blog.get('title'),
  //       // photo: blog.get('photo'),
  //       // body: blog.get('body'),
  //       // tags: blog.get('tags'),
  //       // categories: blog.get('categories'),
  //       blog,
  //     },
  //     {
  //       headers: {
  //         // Accept: 'application/json',
  //         'Content-Type': 'multipart/form-data',
  //         // 'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       transformRequest: (data) => {
  //         return data
  //       },
  //     }
  //   )
  //   .then((response) => {
  //     console.log('resonpose', response)
  //     // console.log('resonpose.data', response.data)
  //     return response
  //   })
  //   .catch((err) => {
  //     console.log('actions auth axios error:', err.message)
  //     return err.response.data
  //   })
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

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
  const data = { skip, limit }
  return axios
    .post(`${API}/api/blogs-categories-tags`, data)
    .then((response) => {
      console.log('blogs-categories-tags', response)
      return response.data
    })
    .catch((error) => console.log(error))
}
