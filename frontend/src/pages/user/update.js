import Link from 'next/link'
import PrivateWrapper from '@components/auth/protected/private-wrapper'
import ProfileUpdate from '@components/auth/protected/profile-update'

const UserProfileUpdate = () => {
  let url = '/user'
  return (
    <>
      <PrivateWrapper>
        <div className="container-fluid">
          <div className="row">
            <ProfileUpdate />
          </div>
        </div>
      </PrivateWrapper>
    </>
  )
}
export default UserProfileUpdate
