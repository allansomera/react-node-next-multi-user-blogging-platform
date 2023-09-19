import Link from 'next/link'
import PrivateWrapper from '@components/auth/protected/private-wrapper'

const UserIndex = () => {
  return (
    <>
      <PrivateWrapper>
        <h1>User Dashboard</h1>
      </PrivateWrapper>
    </>
  )
}
export default UserIndex
