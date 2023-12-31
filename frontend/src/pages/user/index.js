import Link from 'next/link'
import PrivateWrapper from '@components/auth/protected/private-wrapper'

const UserIndex = () => {
  let url = '/user'
  return (
    <>
      <PrivateWrapper>
        <div className="container-fluid">
          <div className="user__header px-[20px]">
            <h1>User Dashboard</h1>
          </div>
          <div className="user__list-group">
            <ul className="max-w-xs flex flex-col py-[20px] px-[20px]">
              <li
                className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px 
                first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-black dark:border-gray-700 dark:text-white"
              >
                <Link href={`${url}/crud/blog`}>Create Blog</Link>
              </li>
              <li
                className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px 
                first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-black dark:border-gray-700 dark:text-white"
              >
                <Link href={`${url}/crud/blogs`}>Update/Delete Blogs</Link>
              </li>
              <li
                className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px 
                first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-black dark:border-gray-700 dark:text-white"
              >
                <Link href={`${url}/update`}>Update Profile</Link>
              </li>
            </ul>
          </div>
        </div>
      </PrivateWrapper>
    </>
  )
}
export default UserIndex
