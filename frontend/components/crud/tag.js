// import { getCookie } from 'actions/auth'

import { useEffect, useState } from 'react'
// import { create, getTags, singleTag, removeTag } from 'actions/tag'
import { create, getTags, removeTag } from '@actions/tag'

import { Button } from '@nextui-org/react'
import { getCookie } from '@actions/auth'

const Tag = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
  })

  const { name, error, success, tags, removed, reload } = values
  const token = getCookie('token')

  // useEffect(() => {
  //   loadCategories()
  // }, [])

  useEffect(() => {
    loadTags()
  }, [reload])

  const loadTags = () => {
    getTags().then((data) => {
      // console.log('getCatgories() => data', data)
      // if (data.error) {
      //   console.log(data.error)
      // } else {
      //   setValues({ ...values, categories: data })
      // }
      // let data_copy = [...data]
      // setValues((prev) => {
      //   return { ...prev, categories: [...data] }
      // })
      setValues({ ...values, tags: data })
      console.log('load tags: ', values.tags)
    })
  }

  const showTags = () => {
    return tags?.map((c, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(c.slug)}
          title="Double click to delete"
          key={i}
          className="my-[5px] mr-[5px] border-solid border-sky-700 border-1 p-[10px] "
        >
          {c.slug}
        </button>
      )
    })
  }

  const deleteConfirm = (slug) => {
    let answer = window.confirm('Are you sure you want to delete this tag?')
    if (answer) {
      deleteTag(slug)
    }
  }

  const deleteTag = (slug) => {
    removeTag(slug, token).then((data) => {
      console.log('remove (data) => ', data)
      // if (data.error) {
      //   console.log(data.error)
      // } else {
      setValues({
        ...values,
        error: false,
        success: false,
        name: '',
        removed: !removed,
        reload: !reload,
      })
      // }
    })
  }

  const clickSubmit = (e) => {
    e.preventDefault()
    create(name, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false })
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: '',
          removed: false,
          reload: !reload,
        })
      }
    })
  }

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: '',
    })
    console.log(values)
  }

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Tag is created</p>
    }
  }

  const showError = () => {
    if (error) {
      return <p className="text-danger">Tag is removed</p>
    }
  }

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Tag is removed</p>
    }
  }

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: '' })
  }

  const newTagForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-group flex flex-col">
          <label className="text-muted">Tag Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name}
            required
          />
        </div>
        <div>
          <Button
            type="submit"
            className="bg-transparent border-1 border-solid my-[10px] border-green-600 text-green-600 rounded-none"
            // className="cat_tag_form_btn"
          >
            Create
          </Button>
        </div>
      </form>
    )
  }

  return (
    <>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={mouseMoveHandler} className="flex flex-col">
        {newTagForm()}
        <div className="tag__list flex-row">{showTags()}</div>
      </div>
    </>
  )
}

export default Tag
