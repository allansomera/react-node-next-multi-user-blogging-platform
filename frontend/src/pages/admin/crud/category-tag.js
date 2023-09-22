import Link from 'next/link'
import AdminWrapper from '@components/auth/protected/admin-wrapper'
import Category from '@components/crud/category'

const CategoryTag = () => {
  return (
    <>
      <AdminWrapper>
        <div className="container-fluid">
          <div className="px-[20px] py-[20px]">
            <h1>Manage Categories and Tags</h1>
          </div>
          <div className="max-w-xs flex pl-[20px] gap-[200px] pb-[20px]">
            <div>
              <Category />
            </div>
            <div>
              <p>Tags</p>
            </div>
          </div>
        </div>
      </AdminWrapper>
    </>
  )
}
export default CategoryTag
