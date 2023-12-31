import Link from 'next/link'

import AdminWrapper from '@components/auth/protected/admin-wrapper'
// import CreateBlog from '@components/crud/create-blog'
import dynamic from 'next/dynamic'
const CreateBlog = dynamic(() => import('@components/crud/create-blog'), {
  ssr: false,
})

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const Blog = () => {
  return (
    <>
      <AdminWrapper>
        <div className="container-fluid">
          <div className="px-[20px] py-[20px]">
            <h1>Create Blogs</h1>
          </div>
          <div className="w-[800px] flex pl-[20px] gap-[200px] pb-[20px]">
            <div className="w-[500px]">
              <CreateBlog />
            </div>
          </div>
        </div>
      </AdminWrapper>
    </>
  )
}
export default Blog
