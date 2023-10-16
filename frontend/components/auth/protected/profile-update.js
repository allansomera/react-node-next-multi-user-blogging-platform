import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { getCookie, isAuth } from '@actions/auth'
import { getProfile, update } from '@actions/user'
import { Button } from '@nextui-org/react'

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    error: false,
    success: false,
    loading: false,
    photo: '',
    about: '',
    userData: '',
  })

  const token = getCookie('token')
  const {
    username,
    name,
    email,
    password,
    error,
    success,
    loading,
    photo,
    userData,
    about,
  } = values

  const init = () => {
    let result = getProfile(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
        })
      }
    })
    // let data = await getProfile(token)
    // setValues({
    //   ...values,
    //   username: data.username,
    //   name: data.name,
    //   email: data.email,
    //   about: data.about,
    // })
    //
    // console.log('init data', data)
  }

  useEffect(() => {
    init()
  }, [])

  const handleChange = (name) => (e) => {
    //
  }

  const handleSubmit = () => {
    //
  }

  const profileUpdateForm = () => {
    return (
      <>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border-1 border-solid border-red-800 w-full"
        >
          <div className="form_group flex flex-row">
            <label className="text-muted">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange('photo')}
            />
          </div>
          <div className="form_group flex flex-row">
            <label className="text-muted">Username</label>
            <input
              type="text"
              value={username}
              onChange={handleChange('username')}
              className="w-full"
            />
          </div>
          <div className="form_group flex flex row">
            <label className="text-muted">Name</label>
            <input type="text" value={name} onChange={handleChange('name')} />
          </div>
          <div className="form_group flex flex-row">
            <label className="text-muted">Email</label>
            <input type="text" value={email} onChange={handleChange('email')} />
          </div>
          <div className="form_group">
            <label className="text-muted">About</label>
            <textarea
              type="text"
              value={about}
              onChange={handleChange('about')}
            />
          </div>
          <div className="form_group">
            <label className="text-muted">Password</label>
            <textarea
              type="text"
              value={about}
              onChange={handleChange('password')}
            />
          </div>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </>
    )
  }
  return (
    <>
      <div>
        <div className="row flex flex-row justify-start mt-[40px] gap-[100px]">
          <div className="col">image</div>
          <div className="update_form w-full">{profileUpdateForm()}</div>
        </div>
      </div>
    </>
  )
}
export default ProfileUpdate
