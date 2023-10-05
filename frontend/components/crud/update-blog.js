// import { getCookie, isAuth } from 'actions/auth'
import { getCookie, isAuth } from '@actions/auth'
import { useEffect, useRef, useState } from 'react'
import Router, { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { singleBlog, updateBlog } from '@actions/blog'
import { getCategories } from '@actions/category'
import { getTags } from '@actions/tag'
import { Button } from '@nextui-org/react'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import '../../node_modules/react-quill/dist/quill.snow.css'
import { DOMAIN } from 'config'

const UpdateBlog = ({ router }) => {
  const input_file_ref = useRef()
  const [blog, setBlog] = useState({})
  const [body, setBody] = useState('')
  const [values, setValues] = useState({
    title: '',
    error: '',
    success: '',
    formData: new FormData(),
    title: '',
    body: '',
  })
  let [categories, setCategories] = useState([])
  let [tags, setTags] = useState([])
  let [checkedCategories, setCheckedCategories] = useState([])
  let [checkedTags, setCheckedTags] = useState([])

  const slug = router.query.slug
  const token = getCookie('token')

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(slug)
        .then((data) => {
          console.log(data)
          setBlog(data)
          setBody(data.body)
          setValues({ ...values, title: data.title })
          setCategoriesArray(data.categories)
          setTagsArray(data.tags)
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  }
  useEffect(() => {
    initBlog()
    initCategories()
    initTags()
    setValues({ ...values, formData: new FormData() })
  }, [router])

  const { title, error, success, formData } = values

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

  const setCategoriesArray = (cat_arr) => {
    // let ca = []
    // cat_arr.forEach((category) => {
    //   ca.push(category._id)
    // })

    let ca = cat_arr.map((category) => {
      return category._id
    })
    console.log('checked_cat_arr: ', ca)
    setCheckedCategories(ca)
  }

  const setTagsArray = (tags_arr) => {
    // let ta = []
    // tags_arr.forEach((tag) => {
    //   ta.push(tag._id)
    // })
    let ta = tags_arr.map((tag) => {
      return tag._id
    })
    console.log('checked_tag_arr: ', ta)
    setCheckedTags(ta)
  }

  const findOutCheckedCategory = (c_id) => {
    // const result = checkedCategories.indexOf(c_id)
    // return result !== -1 ? true : false
    return checkedCategories.indexOf(c_id) !== -1 ? true : false
  }

  const findOutCheckedTag = (t_id) => {
    // const result = checkedTags.indexOf(t_id)
    // return result !== -1 ? true : false
    return checkedTags.indexOf(t_id) !== -1 ? true : false
  }
  const handleBody = (e) => {
    setBody(e)
    formData.set('body', e)
  }

  const editBlog = (e) => {
    e.preventDefault()
    // console.log('update blog')
    updateBlog(formData, token, slug)
      .then((data) => {
        // console.log(data)
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
            // title: '',
            success: `A blog titled ${data.result.title} has been updated`,
          })
          if (isAuth() && isAuth().role === 1) {
            Router.replace(`/admin/crud/${router.query.slug}`)
          } else {
            Router.replace(`/user/crud/${router.query.slug}`)
          }
          // setBody('')
          // setCheckedCategories([])
          // setCheckedTags([])
          // initCategories()
          // initTags()
        }
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
  const handleChange = (name) => (e) => {
    let value = name === 'photo' ? e.target.files[0] : e.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value, formData, error: '' })
  }

  const handleToggleCategories = (category_id) => () => {
    setValues({ ...values, error: '' })
    //return the first index or -1
    console.log('checkedCategories before: ', checkedCategories)
    const clickedCategory = checkedCategories.indexOf(category_id)
    console.log('clickedCategory', clickedCategory)
    const all = [...checkedCategories]
    console.log('handleToggleCategories(): {all} before=> ', all)
    if (clickedCategory === -1) {
      all.push(category_id)
    } else {
      all.splice(clickedCategory, 1)
    }
    console.log('handleToggleCategories(): {all} after=> ', all)
    // console.log(
    //   'handleToggleCategories(): {all} after=> ',
    //   all.map((a) => {
    //     return a
    //   })
    // )
    // setCheckedCategories((_prev) =>
    //   all.map((a) => {
    //     return a
    //   })
    // )
    // setCheckedCategories(all, () => {
    //   console.log('setCategories() state: ', checkedCategories)
    // })
    setCheckedCategories(all)
    console.log('checkedCategories after: ', checkedCategories)
    formData.set('categories', all)
    setValues({ ...values, formData })
    console.log('formData categories: ', formData.get('categories'))
  }

  const handleToggleTags = (tag_id) => () => {
    setValues({ ...values, error: '' })
    //return the first index or -1
    const clickedTags = checkedTags.indexOf(tag_id)
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

  const updateBlogForm = () => {
    return (
      <>
        <form
          onSubmit={editBlog}
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
              modules={UpdateBlog.modules}
              formats={UpdateBlog.formats}
              value={body}
              placeholder="type here"
              onChange={handleBody}
            />
          </div>
          <div>
            <Button
              className="border-1 border-solid border-orange-400 bg-transparent rounded-sm text-orange-400 uppercase"
              type="submit"
            >
              Update
            </Button>
          </div>
          {showError()}
          {showSuccess()}
        </form>
      </>
    )
  }

  const showCategories = () => {
    return (
      <>
        {categories &&
          categories.map((cat, i) => {
            return (
              <li className="list-unstyled" key={i + cat._id}>
                <input
                  checked={findOutCheckedCategory(cat._id)}
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
              <li className="list-unstyled" key={i + tag._id}>
                <input
                  checked={findOutCheckedTag(tag._id)}
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
        <h1>Update Single Blog</h1>
        <div className="flex flex-row border-dashed border-1 border-blue-800 gap-[200px]">
          <div className="w-[800px] border-1 border-solid border-green-800 whitespace-pre-wrap">
            {updateBlogForm()}
          </div>
          <div className="border-dashed border-1 border-red-500 flex flex-col">
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

UpdateBlog['modules'] = {
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

UpdateBlog.formats = [
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

export default withRouter(UpdateBlog)
