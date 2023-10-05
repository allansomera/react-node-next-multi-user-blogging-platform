// import { getCookie, isAuth } from 'actions/auth'
import { getCookie, isAuth } from '@actions/auth'
import { useEffect, useRef, useState } from 'react'
import Router, { useRouter, withRouter } from 'next/router'
import { getBlogs, removeBlog } from '@actions/blog'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Button, useDisclosure } from '@nextui-org/react'
import DeleteModal from '@components/modal/delete-modal'
import Link from 'next/link'

const ReadBlog = () => {
  let router = useRouter()

  dayjs.extend(relativeTime)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  let [blogs, setBlogs] = useState([])
  let [message, setMessage] = useState('')

  useEffect(() => {
    loadBlogs()
  }, [])

  const loadBlogs = () => {
    getBlogs().then((data) => {
      setBlogs(data)
    })
  }

  const updateButton_handler = (blog, role) => {
    if (role !== 1) {
      router.push(`/user/crud/${blog.slug}`)
    } else {
      router.push(`/admin/crud/${blog.slug}`)
    }
  }
  const showUpdateButton = (blog) => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Button
          className="border-1 border-solid border-orange-400 bg-transparent rounded-sm text-orange-400 uppercase"
          onClick={() => updateButton_handler(blog, isAuth().role)}
        >
          Update
        </Button>
      )
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Button
          className="border-1 border-solid border-orange-400 bg-transparent rounded-sm text-orange-400 uppercase"
          onClick={() => updateButton_handler(blog, isAuth().role)}
        >
          Update
        </Button>
      )
    }
  }

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <>
          <div className="mt-5 w-full" key={i}>
            <h3>{blog.title}</h3>
            <p>
              Written by {blog.postedBy.name} | Published{' '}
              {dayjs(blog.updatedAt).fromNow()}
            </p>
          </div>

          <div className="readblog__delete-update-container flex flex-row">
            <DeleteModal
              key={i + blog._id}
              blog={blog}
              // loadBlogs={loadBlogs}
              setMessage={setMessage}
              setBlogs={setBlogs}
            />
            {showUpdateButton(blog)}
          </div>
        </>
      )
    })
  }

  const mouseMoveHandler = (_e) => {
    setMessage('')
  }

  return (
    <>
      <div>
        <p>update delete blogs</p>
        <div>
          {message && (
            <div className="mb-4 rounded-lg bg-secondary-100 px-6 py-5 text-base text-secondary-800 my-[16px]">
              {message}
            </div>
          )}
        </div>
        <div onMouseMove={mouseMoveHandler} className="flex flex-col w-screen">
          {showAllBlogs()}
        </div>
      </div>
    </>
  )
}

export default ReadBlog
