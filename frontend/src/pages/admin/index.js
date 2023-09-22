import Link from 'next/link'
import AdminWrapper from '@components/auth/protected/admin-wrapper'

const AdminIndex = () => {
  let url = '/admin'
  return (
    <>
      <AdminWrapper>
        <div className="container-fluid">
          <div className="admin__header px-[20px]">
            <h1>Admin Dashboard</h1>
          </div>
          <div className="admin__list-group">
            <ul class="max-w-xs flex flex-col py-[20px] px-[20px]">
              <li
                class="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px 
                first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-black dark:border-gray-700 dark:text-white"
              >
                <Link href={`${url}/crud/category-tag`}>Create Category</Link>
              </li>
              <li
                class="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px 
                first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-black dark:border-gray-700 dark:text-white"
              >
                Settings
              </li>
              <li
                class="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px 
                first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-black dark:border-gray-700 dark:text-white"
              >
                Newsletter
              </li>
            </ul>
          </div>
        </div>
      </AdminWrapper>
    </>
  )
}
export default AdminIndex
