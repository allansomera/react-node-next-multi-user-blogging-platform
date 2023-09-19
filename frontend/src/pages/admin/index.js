import Link from 'next/link'
import AdminWrapper from '@components/auth/protected/admin-wrapper'

const AdminIndex = () => {
  return (
    <>
      <AdminWrapper>
        <h1>Admin Dashboard</h1>
      </AdminWrapper>
    </>
  )
}
export default AdminIndex
