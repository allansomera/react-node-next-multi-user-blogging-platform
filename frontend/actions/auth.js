import axios from 'axios'

import { API } from 'config'

export const signup = async (user) => {
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
