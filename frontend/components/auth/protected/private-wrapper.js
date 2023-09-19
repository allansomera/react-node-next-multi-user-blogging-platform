import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { isAuth } from 'actions/auth'

const PrivateWrapper = ({ children }) => {
  let router = useRouter()
  useEffect(() => {
    if (!isAuth()) {
      router.push(`/signin`)
    }
  }, [])
  return <>{children}</>
}

export default PrivateWrapper
