import axios from 'axios'

import { API } from 'config'

import Cookies from 'js-cookie'
import Router from 'next/router'

export const handleResponse = (response) => {
  if (response.status === 401) {
    signout(() => {
      Router.push({
        pathname: '/signin',
        query: {
          message: 'Your session is expired. Please signin',
        },
      })
    })
  } else {
    return
  }
}

export const signup = (user) => {
  // return (
  //   ({ data } = await axios.POST(`${API}/signup`)),
  //   {
  //     user: user,
  //   },
  //   {
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // )
  let { email, name, password } = user
  // try {
  //   const response = await axios.post(
  //     `${API}/api/signup`,
  //     {
  //       email,
  //       name,
  //       password,
  //     },
  //     {
  //       headers: {
  //         // Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   )
  //   console.log('response', response)
  //   return response
  // } catch (error) {
  //   console.log('signup actions auth error:', error.response.data.error)
  //   return error.response.data.error
  // }
  //>>>
  return axios
    .post(
      `${API}/api/signup`,
      {
        email,
        name,
        password,
      },
      {
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
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
  //>>>
}

export const signin = (user) => {
  let { email, password } = user
  return axios
    .post(
      `${API}/api/signin`,
      {
        email,
        password,
      },
      {
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
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

//@params
//next is a callback function
// export const signout = (next) => {
export const signout = (callback_fn) => {
  removeCookie('token')
  removeLocalStorage('user')
  callback_fn()
  return axios
    .get(`${API}/api/signout`)
    .then((response) => {
      console.log('signout successful')
    })
    .catch((error) => {
      console.log(error)
    })
}

//set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    // console.log('setCookie => typeof window: ', value)
    Cookies.set(key, value, {
      expires: 1,
    })
  }
}

export const removeCookie = (key) => {
  if (process.browser) {
    Cookies.remove(key, {
      expires: 1,
    })
  }
}

// get Cookies
export const getCookie = (key) => {
  if (process.browser) {
    return Cookies.get(key)
  }
}
//localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key)
  }
}

// authenticate user by pass data to cookie and localStorage
// @params
// data - the response.data we received
// next - callback function
export const authenticate = (data, next) => {
  setCookie('token', data.token)
  setLocalStorage('user', data.user)
  next()
}

export const isAuth = () => {
  if (process.browser) {
    console.log('in isAuth')
    const cookieChecked = getCookie('token')
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))
      } else {
        return false
      }
    }
  }
}
