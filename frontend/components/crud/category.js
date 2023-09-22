import { getCookie } from 'actions/auth'
import { useEffect, useState } from 'react'
import {
  create,
  getCategories,
  singleCategory,
  removeCategory,
} from 'actions/category'

// import { Button } from '@nextui-org/react'

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
  })

  const { name, error, success, categories, removed, reload } = values
  const token = getCookie('token')

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadCategories()
  }, [reload])

  const loadCategories = () => {
    getCategories().then((data) => {
      console.log('getCatgories() => data', data)
      // if (data.error) {
      //   console.log(data.error)
      // } else {
      //   setValues({ ...values, categories: data })
      // }
      // let data_copy = [...data]
      // setValues((prev) => {
      //   return { ...prev, categories: [...data] }
      // })
      setValues({ ...values, categories: data })
      console.log('load categories: ', values.categories)
    })
  }

  const showCategories = () => {
    return categories?.map((c, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(c.slug)}
          title="Double click to delete"
          key={i}
          className="mb-[5px] border-solid border-sky-700 border-1 p-[10px] m-[5px]"
        >
          {c.slug}
        </button>
      )
    })
  }

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      'Are you sure you want to delete this category?'
    )
    if (answer) {
      deleteCategory(slug)
    }
  }

  const deleteCategory = (slug) => {
    removeCategory(slug, token).then((data) => {
      console.log('remove (data) => ', data)
      if (data.error) {
        console.log(data.error)
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: '',
          removed: !removed,
          reload: !reload,
        })
      }
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
      return <p className="text-success">Category is created</p>
    }
  }

  const showError = () => {
    if (error) {
      return <p className="text-danger">category is removed</p>
    }
  }

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Category is removed</p>
    }
  }

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: '' })
  }

  const newCategoryForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-group flex flex-col">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name}
            required
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
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
        {newCategoryForm()}
        <div className="flex-row">{showCategories()}</div>
      </div>
    </>
  )
}

export default Category
