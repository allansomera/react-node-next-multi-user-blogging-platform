import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { getCookie, isAuth } from '@actions/auth'
import { getProfile, update } from '@actions/user'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import { API } from 'config'

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: '',
    username_for_photo: '',
    name: '',
    email: '',
    password: '',
    error: false,
    success: false,
    loading: false,
    photo: '',
    about: '',
    userData: process.browser && new FormData(),
  })

  const token = getCookie('token')
  let {
    username,
    username_for_photo,
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
          username_for_photo: data.username,
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
    setValues({ ...values, userDagta: new FormData() })
  }, [])

  const handleChange = (name) => (e) => {
    let value = name === 'photo' ? e.target.files[0] : e.target.value
    // let userFormData = new FormData()
    userData.set(name, value)
    // console.log('userFormData: ', userFormData)
    setValues({
      ...values,
      [name]: value,
      userData,
      error: false,
      success: false,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setValues({ ...values, loading: true })
    console.log('handleSubmit userData: ', userData)
    update(token, userData)
      .then((data) => {
        console.log('handleSubmit .then((data)): ', data)
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
          success: true,
          loading: false,
        })
      })
      .catch((error) => {
        setValues({
          ...values,
          error: error.message,
          success: false,
          loading: false,
        })
      })
  }
  const showError = () => {
    return (
      <>
        <div
          className="mb-4 rounded-lg bg-danger-100 px-6 py-5 text-base text-danger-700 my-[24px]"
          style={{ display: error ? '' : 'none' }}
        >
          error
        </div>
      </>
    )
  }

  const showSuccess = () => {
    return (
      <>
        <div
          className="mb-4 rounded-lg bg-secondary-100 px-6 py-5 text-base text-secondary-800 my-[16px]"
          style={{ display: success ? '' : 'none' }}
        >
          success
        </div>
      </>
    )
  }

  const showLoading = () =>
    loading ? (
      <div
        className="mb-4 rounded-lg bg-success-100 px-6 py-5 text-base text-success-700 my-[24px]"
        role="alert"
      >
        ...Loading
      </div>
    ) : (
      ''
    )

  const profileUpdateForm = () => {
    return (
      <>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border-1 border-solid border-red-800 w-full"
        >
          <div className="form_group flex flex-col">
            <label
              className="text-muted border-1 border-solid bg-transparent w-[150px] 
              text-center border-rounded border-purple-800 text-purple-800 p-4"
            >
              Profile Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleChange('photo')}
                hidden
              />
            </label>
          </div>
          <div className="form_group flex flex-col">
            <label className="text-muted">Username</label>
            <input
              type="text"
              value={username}
              onChange={handleChange('username')}
              className="w-full"
            />
          </div>
          <div className="form_group flex flex-col">
            <label className="text-muted">Name</label>
            <input type="text" value={name} onChange={handleChange('name')} />
          </div>
          <div className="form_group flex flex-col">
            <label className="text-muted">Email</label>
            <input type="text" value={email} onChange={handleChange('email')} />
          </div>
          <div className="form_group flex flex-col">
            <label className="text-muted">About</label>
            <textarea
              type="text"
              value={about}
              onChange={handleChange('about')}
            />
          </div>
          <div className="form_group flex flex-col">
            <label className="text-muted">Password</label>
            <textarea
              type="password"
              value={password}
              onChange={handleChange('password')}
            />
          </div>
          <div>
            {showSuccess()}
            {showError()}
            {showLoading()}
          </div>
          <div>
            <Button type="submit" disabled={!username || !name || !email}>
              Submit
            </Button>
          </div>
        </form>
      </>
    )
  }
  return (
    <>
      <div>
        <div className="row flex flex-row justify-start mt-[40px] gap-[24px]">
          <div className="col">
            <Image
              src={`${API}/api/user/photo/${username}`}
              width={300}
              height={300}
            />
          </div>
          <div className="update_form w-full">{profileUpdateForm()}</div>
        </div>
      </div>
    </>
  )
}
export default ProfileUpdate
