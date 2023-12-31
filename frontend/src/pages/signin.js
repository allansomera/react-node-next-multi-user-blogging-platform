import SigninComponent from '@components/auth/signin/signin-component'
import { isAuth } from 'actions/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { withRouter } from 'next/router'

const Signin = ({ router }) => {
  let route = useRouter()
  const showRedirectMessage = () => {
    if (router.query.message) {
      console.log('does router.query.message exist?', router.query.message)
      return <div className="text-red-700">{router.query.message}</div>
    } else {
      return
    }
  }
  useEffect(() => {
    if (isAuth()) {
      route.replace(`/`)
    }
  }, [])
  return (
    <>
      <h1 className="text-center py-[20px]">Signin page</h1>
      <div className="flex flex-row justify-center">
        {showRedirectMessage()}
      </div>
      <div className="flex justify-center">
        <SigninComponent />
      </div>
    </>
  )
}

export default withRouter(Signin)
