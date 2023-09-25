// import { getCookie, isAuth } from 'actions/auth'
import { getCookie, isAuth } from '@actions/auth'
import { useEffect, useState } from 'react'
import Router, { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { createBlog } from 'actions/blog'
import { getCategories } from '@actions/category'
import { getTags } from '@actions/tag'
import { Button } from '@nextui-org/react'
const ReactQuill = dynamic(() => import('react-quill', { ssr: false }))
import '../../node_modules/react-quill/dist/quill.snow.css'

const CreateBlog = ({ router }) => {
  let [value, setValue] = useState('type')
  return (
    <>
      <h1>Create Blog Form</h1>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      {
        // JSON.stringify(router)
      }
    </>
  )
}

export default withRouter(CreateBlog)
