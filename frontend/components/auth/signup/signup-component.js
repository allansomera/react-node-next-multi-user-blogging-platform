import React from 'react'
import { Input } from '@nextui-org/react'
import { EyeFilledIcon } from '../eye-filled'
import { EyeSlashFilledIcon } from '../eye-slash-filled'

const SignupComponent = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('handle submit')
  }

  const handleChange = (e) => {
    console.log(e.target.value)
  }
  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const signupForm = () => {
    let variant = 'underlined'
    return (
      <form onSubmit={handleSubmit}>
        <div
          key={variant}
          className="flex w-full flex-col flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        >
          <Input type="text" variant={variant} label="Name" />
          <Input type="email" variant={variant} label="Email" />
          <Input
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
            className="max-w-xs"
          />
        </div>
      </form>
    )
  }

  return <>{signupForm()}</>
}

export default SignupComponent
