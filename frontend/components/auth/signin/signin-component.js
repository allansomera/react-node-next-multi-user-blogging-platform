import React, { useState, useRef } from 'react'
import { Input, Button } from '@nextui-org/react'
import { EyeFilledIcon } from '../eye-filled'
import { EyeSlashFilledIcon } from '../eye-slash-filled'
import { signin, authenticate } from 'actions/auth'
import Router from 'next/router'

const SigninComponent = () => {
  const formRef = useRef()
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  })

  const { email, password, error, loading, message, showForm } = values

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

  const showError = () =>
    error ? (
      <div
        className="mb-4 rounded-lg bg-danger-100 px-6 py-5 text-base text-danger-700 my-[24px]"
        role="alert"
      >
        {error}
      </div>
    ) : (
      ''
    )

  const showMessage = () =>
    message ? (
      <div
        className="mb-4 rounded-lg bg-secondary-100 px-6 py-5 text-base text-secondary-800 my-[16px]"
        role="alert"
      >
        {message}
      </div>
    ) : (
      ''
    )
  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = { email, password }

    // >>>
    setValues({ ...values, loading: true, error: false })
    signin(user).then((response) => {
      console.log('response: ', response)
      if (response.error) {
        // console.log('inside data.error:', data.data.error)
        setValues({ ...values, error: response.error, loading: false })
      } else {
        let { data } = response
        // save user token to cookie
        // save user info to localstorage
        //authenticate user
        authenticate(data, () => {
          Router.push(`/`)
        })
      }
    })
    // >>>
  }

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value })
    console.log(values)
  }
  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const signinForm = () => {
    let variant = 'underlined'
    return (
      <form
        ref={formRef}
        id="test_form"
        onSubmit={handleSubmit}
        className="w-[600px]"
      >
        <div
          key={variant}
          className="flex w-full flex-col flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10 pb-[40px]"
        >
          <Input
            onChange={handleChange('email')}
            value={email}
            type="email"
            variant={variant}
            label="Email"
          />
          <Input
            onChange={handleChange('password')}
            className="w-full"
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            // value={password}
          />
          <div className="w-[150px]">
            <Button
              // onPress={handleSubmit}
              // form="test_form"
              className="bg-green-800 text-white-400 w-full"
              type="submit"
            >
              Sign In
            </Button>
          </div>
        </div>
      </form>
    )
  }

  return (
    <div className="flex flex-col">
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </div>
  )
}

export default SigninComponent
