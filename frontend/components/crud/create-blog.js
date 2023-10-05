// import { getCookie, isAuth } from 'actions/auth'
import { getCookie, isAuth } from '@actions/auth'
import { useEffect, useRef, useState } from 'react'
import Router, { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { createBlog } from '@actions/blog'
import { getCategories } from '@actions/category'
import { getTags } from '@actions/tag'
import { Button } from '@nextui-org/react'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import '../../node_modules/react-quill/dist/quill.snow.css'

const CreateBlog = ({ router }) => {
  const input_file_ref = useRef()
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
  const titleFromLS = () => {
    if (typeof window === 'undefined') {
      return false
    }
    if (localStorage.getItem('title')) {
      return JSON.parse(localStorage.getItem('title'))
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
  // let [title_n, setTitle_n] = useState(titleFromLS())
  const { error, sizeError, success, formData, title, hidePublishButton } =
    values
  let [categories, setCategories] = useState([])
  let [tags, setTags] = useState([])
  let [checkedCategories, setCheckedCategories] = useState([])
  let [checkedTags, setCheckedTags] = useState([])
  let token = getCookie('token')

  useEffect(() => {
    setValues({ ...values, formData: new FormData() })
    if (localStorage.getItem('blog')) {
      setBody(JSON.parse(localStorage.getItem('blog')))
    }
    // formData.set('body', JSON.parse(localStorage.getItem('body')))
    // setTitle_n(JSON.parse(localStorage.getItem('title')))
    // formData.set('title', JSON.parse(localStorage.getItem('title')))
    initCategories()
    initTags()
  }, [router])

  const publishBlog = (e) => {
    e.preventDefault()
    // console.log('ready to publishBlog')
    // createBlog(formData, getCookie('token'))
    // console.log('publish')
    // console.log('formData', formData)

    // for (const val of formData.values()) {
    //   console.log('val: ', val)
    // }
    // console.log('fd title: ', formData.get('title'))
    // console.log('fd blog: ', formData.get('blog'))
    // let new_fd = new FormData()
    // new_fd.append('title', 'new fd title')
    // new_fd.append(
    //   'body',
    //   'bblogblogblogblogblogblogblogblogblogblogblogblogbblogblogblogblogblogblogblogblogblogblogblogbloglogblogblogblogblogblogblogbloglog'
    // )
    // console.log('new_fd_title: ', new_fd.get('title'))
    // console.log('new_fd_body: ', new_fd.get('body'))

    createBlog(formData, token).then((data) => {
      console.log('publish_blog: ', data)
      // console.log('createBlog response data: ', data)
      if (data.error) {
        console.log('data_error', data.error)
        setValues({
          ...values,
          title: '',
          error: data.error,
          success: '',
        })
      } else {
        setValues({
          ...values,
          title: '',
          error: '',
          success: `A new blog titled ${data.result.title} is created`,
        })
        setBody('')
        setCheckedCategories([])
        setCheckedTags([])
        initCategories()
        initTags()
      }
    })
    // .catch((error) => {
    //   console.log(error.message)
    // })
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

    // if (typeof window !== 'undefined') {
    //   localStorage.setItem('title', JSON.stringify(e.target.value))
    // }

    formData.set(name, value)
    // if (name === 'title') {
    //   setTitle_n(e.target.value)
    //   setValues({ ...values, title: title_n })
    // }
    // for (const val of formData.values()) {
    //   console.log(val)
    // }
    // console.log('handle_change name: ', name)
    // console.log('handle_change value: ', value)
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

  const handleToggleCategories = (category_id) => () => {
    setValues({ ...values, error: '' })
    //return the first index or -1
    const clickedCategory = checkedCategories.indexOf(category_id)
    const all = [...checkedCategories]
    if (clickedCategory === -1) {
      all.push(category_id)
    } else {
      all.splice(clickedCategory, 1)
    }
    console.log(all)
    setCheckedCategories([...all])
    formData.set('categories', all)
  }

  const handleToggleTags = (tags_id) => () => {
    setValues({ ...values, error: '' })
    //return the first index or -1
    const clickedTags = checkedTags.indexOf(tags_id)
    const all = [...checkedTags]
    if (clickedTags === -1) {
      all.push(tags_id)
    } else {
      all.splice(clickedTags, 1)
    }
    console.log(all)
    setCheckedTags([...all])
    formData.set('tags', all)
  }

  const showCategories = () => {
    return (
      <>
        {categories &&
          categories.map((cat, i) => {
            return (
              <li className="list-unstyled" key={cat._id}>
                <input
                  onChange={handleToggleCategories(cat._id)}
                  type="checkbox"
                  className="mx-2"
                />
                <label className="form-check-label">{cat.name}</label>
              </li>
            )
          })}
      </>
    )
  }

  const showTags = () => {
    return (
      <>
        {tags &&
          tags.map((tag, i) => {
            return (
              <li className="list-unstyled" key={tag._id}>
                <input
                  onChange={handleToggleTags(tag._id)}
                  type="checkbox"
                  className="mx-2"
                />
                <label className="form-check-label">{tag.name}</label>
              </li>
            )
          })}
      </>
    )
  }

  const createBlogForm = () => {
    return (
      <>
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
              // value={title}
            />
          </div>
          <div>
            <ReactQuill
              className="mt-3 max-w-screen-lg"
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
          {showError()}
          {showSuccess()}
        </form>
      </>
    )
  }
  const onInputFileBtnClick = () => {
    input_file_ref.current.click()
  }

  const showError = () => {
    return (
      <>
        <div
          className="mb-4 rounded-lg bg-danger-100 px-6 py-5 text-base text-danger-700 my-[24px]"
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>
      </>
    )
  }

  const showSuccess = () => {
    return (
      <>
        <div
          className="mb-4 rounded-lg bg-secondary-100 px-6 py-5 text-base text-secondary-800 my-[16px]"
          style={{ display: success ? '' : 'none' }}
        >
          {success}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="blog__container flex flex-col border-dashed border-1 border-yellow-200 w-screen">
        <h1>Create Blog</h1>
        <div className="flex flex-row border-dashed border-1 border-blue-800 gap-[200px]">
          {createBlogForm()}
          <div className="border-dashed border-1 border-red-500 w-[500px]">
            <div className="show__upload flex flex-col">
              <h2>Featured Image</h2>
              <hr />
              <small className="text-muted">Maximum size: 1mb</small>
              <Button
                onClick={onInputFileBtnClick}
                className="bg-transparent border-1 border-solid my-[10px] border-green-600 text-green-600 rounded-none w-[200px]"
              >
                Upload featured image
                <input
                  onChange={handleChange('photo')}
                  type="file"
                  accept="image/*"
                  ref={input_file_ref}
                  hidden
                />
              </Button>
            </div>
            <div className="show__categories max-h-[200px] overflow-y-scroll">
              <h2>Categories</h2>
              <hr />
              <ul>{showCategories()}</ul>
            </div>
            <div className="show__tags max-h-[200px] overflow-y-hidden">
              <h2>Tags</h2>
              <hr />
              <ul>{showTags()}</ul>
            </div>
          </div>
        </div>
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
