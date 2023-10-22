import Link from 'next/link'

import PrivateWrapper from '@components/auth/protected/private-wrapper'
// import CreateBlog from '@components/crud/create-blog'
import dynamic from 'next/dynamic'
const CreateBlog = dynamic(() => import('@components/crud/create-blog'), {
  ssr: false,
})

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const UserCreateBlog = () => {
  return (
    <>
      <PrivateWrapper>
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
      </PrivateWrapper>
    </>
  )
}
export default UserCreateBlog
