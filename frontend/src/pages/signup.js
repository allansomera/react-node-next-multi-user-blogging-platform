import SignupComponent from '@components/auth/signup/signup-component'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { isAuth } from 'actions/auth'

const Signup = () => {
  let router = useRouter()
  useEffect(() => {
    if (isAuth()) {
      router.replace(`/`)
    }
  }, [])
  return (
    <>
      <h1 className="text-center py-[20px]">Signup page</h1>
      <div className="flex justify-center">
        <SignupComponent />
      </div>
    </>
  )
}

export default Signup
