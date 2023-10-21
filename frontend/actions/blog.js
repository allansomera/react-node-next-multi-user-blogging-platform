import axios from 'axios'
import { API } from 'config'
import queryString from 'query-string'
import { isAuth } from './auth'

export const createBlog = (blog, token) => {
  // let { email, password } = user
  let create_blog_endpoint =
    isAuth() && isAuth().role === 1 ? `${API}/api/blog` : `${API}/api/user/blog`
  let reqOptions = {
    url: `${create_blog_endpoint}`,
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
      // console.log('singleBlog_actions => ', response.data)
      return response.data
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
      return response.data
    })
    .catch((error) => console.log(error))
}

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
  const data = { skip, limit }
  return axios
    .post(`${API}/api/blogs-categories-tags`, data)
    .then((response) => {
      // console.log('blogs-categories-tags', response)
      return response.data
    })
    .catch((error) => console.log(error.message))
}

export const relatedBlogsByCategories = (cat_slug, skip, limit) => {
  const data = { cat_slug, skip, limit }
  return axios
    .post(`${API}/api/blogs/related/categories`, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error.message)
    })
}

export const listRelatedBlogs = (one_blog) => {
  let data = { blog: one_blog }
  return axios
    .post(`${API}/api/blogs/related`, data)
    .then((response) => {
      // console.log('/blogs/related', response.data)
      return response.data
    })
    .catch((error) => {
      console.log(error.message)
    })
}

export const updateBlog = (blog, token, slug) => {
  // let { email, password } = user
  let reqOptions = {
    url: `${API}/api/blog/${slug}`,
    method: 'PUT',
    data: blog,
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  return axios
    .request(reqOptions)
    .then((response) => {
      console.log('reqOptions', response)
      return response.data
    })
    .catch((err) => {
      console.log('actions auth axios error:', err.message)
      return err.response.data
    })
}
export const listSearch = (params) => {
  console.log('search params: ', params)
  let query = queryString.stringify(params)
  console.log('queryString: ', params)
  return axios
    .get(`${API}/api/blogs/search?${query}`)
    .then((response) => {
      console.log('/blogs/search', response.data)
      return response.data
    })
    .catch((error) => {
      console.log(error.message)
    })
}
