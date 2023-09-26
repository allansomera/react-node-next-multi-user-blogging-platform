// import { getCookie, isAuth } from 'actions/auth'
import { getCookie, isAuth } from '@actions/auth'
import { useEffect, useState } from 'react'
import Router, { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { createBlog } from 'actions/blog'
import { getCategories } from '@actions/category'
import { getTags } from '@actions/tag'
import { Button } from '@nextui-org/react'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import '../../node_modules/react-quill/dist/quill.snow.css'

const CreateBlog = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === 'undefined') {
      return false
    }
    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'))
    } else {
      return false
    }
  }
  let [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false,
  })

  let [body, setBody] = useState(blogFromLS())
  const { error, sizeError, success, formData, title, hidePublishButton } =
    values
  let [categories, setCategories] = useState([])
  let [tags, setTags] = useState([])

  useEffect(() => {
    setValues({ ...values, formData: new FormData() })
    initCategories()
    initTags()
  }, [router])

  const publishBlog = (e) => {
    e.preventDefault()
    console.log('ready to publishBlog')
  }

  const initCategories = () => {
    getCategories().then((data) => {
      console.log('getCategories_data => ', data)
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setCategories(data)
      }
    })
  }
  const initTags = () => {
    getTags().then((data) => {
      console.log('getTags_data => ', data)
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setTags(data)
      }
    })
  }

  const handleChange = (name) => (e) => {
    // setValues((prev) => ({ ...prev, title: e.target.value }))
    // console.log(e.target.value)
    let value = name === 'photo' ? e.target.files[0] : e.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value, formData, error: '' })
  }

  const handleBody = (e) => {
    // console.log(e.target.value)
    setBody(e)
    formData.set('body', e)
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e))
    }
  }

  const showCategories = () => {
    return (
      <>
        <div className="show__categories">
          <ul>
            {categories.map((i) => {
              return <li>{i.name}</li>
            })}
          </ul>
        </div>
      </>
    )
  }

  const showTags = () => {
    return (
      <>
        <div className="show__tags">
          <ul>
            {tags.map((i) => {
              return <li>{i.name}</li>
            })}
          </ul>
        </div>
      </>
    )
  }

  const createBlogForm = () => {
    return (
      <form
        onSubmit={publishBlog}
        className="border-dashed border-1 border-green-400"
      >
        <div className="mt-3">
          <label className="mr-3">Title</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange('title')}
            value={title}
          />
        </div>
        <div>
          <ReactQuill
            className="mt-3"
            modules={CreateBlog.modules}
            formats={CreateBlog.formats}
            value={body}
            placeholder="type here"
            onChange={handleBody}
          />
        </div>
        <div>
          <Button className="mt-3 bg-sky-800" type="submit">
            Publish
          </Button>
        </div>
      </form>
    )
  }

  return (
    <>
      <div className="blog__container flex flex-col border-dashed border-1 border-yellow-200 w-screen">
        <h1>Create Blog</h1>
        <div className="flex flex-row border-dashed border-1 border-blue-800 gap-[200px]">
          {createBlogForm()}
          <div className="border-dashed border-1 w-[500px]">
            <h2>Categories</h2>
            <div className="categories">{showCategories()}</div>
            <hr />
            <h2>Tags</h2>
            <div className="tags">{showTags()}</div>
          </div>
        </div>
        <hr />
        {JSON.stringify(title)}
        <hr />
        {JSON.stringify(body)}
        <hr />
        {JSON.stringify(categories)}
        <hr />
        {JSON.stringify(tags)}
      </div>
    </>
  )
}

CreateBlog['modules'] = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block'],
  ],
}

CreateBlog.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'buillet',
  'link',
  'image',
  'video',
  'code-block',
]

export default withRouter(CreateBlog)
