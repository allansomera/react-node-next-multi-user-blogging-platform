import Link from 'next/link'

import PrivateWrapper from '@components/auth/protected/private-wrapper'
// import CreateBlog from '@components/crud/create-blog'
import dynamic from 'next/dynamic'
import Router, { withRouter } from 'next/router'
const UpdateBlog = dynamic(() => import('@components/crud/update-blog'), {
  ssr: false,
})

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const UserUpdateSingleBlog = ({ router }) => {
  return (
    <>
      <PrivateWrapper>
        <div className="container-fluid">
          <div className="px-[20px] py-[20px]">
            <h1>{`Update ${router.query.slug}`}</h1>
          </div>
          <div className="w-[800px] flex flex-col pl-[20px] gap-[200px] pb-[20px]">
            <div>
              <UpdateBlog />
            </div>
          </div>
        </div>
      </PrivateWrapper>
    </>
  )
}
export default withRouter(UserUpdateSingleBlog)
