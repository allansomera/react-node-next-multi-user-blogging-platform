import SigninComponent from '@components/auth/signin/signin-component'
import { isAuth } from 'actions/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
const Signin = () => {
  let router = useRouter()
  useEffect(() => {
    if (isAuth()) {
      router.replace(`/`)
    }
  }, [])
  return (
    <>
      <h1 className="text-center py-[20px]">Signin page</h1>
      <div className="flex justify-center">
        <SigninComponent />
      </div>
    </>
  )
}

export default Signin
