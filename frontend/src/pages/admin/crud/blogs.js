import Link from 'next/link'

import AdminWrapper from '@components/auth/protected/admin-wrapper'
// import CreateBlog from '@components/crud/create-blog'
// import dynamic from 'next/dynamic'
import ReadBlog from '@components/crud/read-blog'
// const ReadBlog = dynamic(() => import('@components/crud/read-blog'), {
//   ssr: false,
// })

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const Blog = () => {
  return (
    <>
      <AdminWrapper>
        <div className="container-fluid">
          <div className="px-[20px] py-[20px]">
            <h1>Manage Blogs</h1>
          </div>
          <div className="w-[800px] flex pl-[20px] gap-[200px] pb-[20px]">
            <div className="w-[500px]">
              <ReadBlog />
            </div>
          </div>
        </div>
      </AdminWrapper>
    </>
  )
}
export default Blog
