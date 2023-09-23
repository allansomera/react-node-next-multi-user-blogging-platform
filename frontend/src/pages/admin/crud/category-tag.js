import Link from 'next/link'
import AdminWrapper from '@components/auth/protected/admin-wrapper'
import Category from '@components/crud/category'
import Tag from '@components/crud/tag'

const CategoryTag = () => {
  return (
    <>
      <AdminWrapper>
        <div className="container-fluid">
          <div className="px-[20px] py-[20px]">
            <h1>Manage Categories and Tags</h1>
          </div>
          <div className="w-[800px] flex pl-[20px] gap-[200px] pb-[20px]">
            <div className="w-[500px]">
              <Category />
            </div>
            <div>
              <Tag />
            </div>
          </div>
        </div>
      </AdminWrapper>
    </>
  )
}
export default CategoryTag
