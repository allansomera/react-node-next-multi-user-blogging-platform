import Link from 'next/link'
import htmr from 'htmr'
import { useState, useEffect } from 'react'
import { listSearch } from '@actions/blog'
import { Button } from '@nextui-org/react'

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: '',
  })

  let { search, results, searched, message } = values

  const searchSubmit = (e) => {
    e.preventDefault()
    listSearch({ search })
      .then((data) => {
        console.log(data)
        setValues({
          ...values,
          results: data,
          searched: true,
          message: `${data.length} blogs found`,
        })
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const searchedBlogs = (results = []) => {
    console.log('searched Blogs', results)
    return (
      <>
        <div>
          {message && <p className="pt-4 text-muted">{message}</p>}
          {results.map((blog, i) => {
            return (
              <div key={i + i + blog._id}>
                <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
              </div>
            )
          })}
        </div>
      </>
    )
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    //when user searches, we want searched to be false
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: [],
    })
  }
  const searchForm = () => {
    return (
      <>
        <form
          onSubmit={searchSubmit}
          className="flex flex-row items-center justify-center w-screen"
        >
          <div className="mr-2">
            <input
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full 
              border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none 
              focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black"
              placeholder="Search for anything..."
              type="text"
              name="search"
              value={search}
            />
          </div>
          <div>
            <Button
              className="bg-transparent border-solid border-1 border-green-400 text-green-400 rounded-md h-[38px]"
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </>
    )
  }

  return (
    <>
      <div className="flex flex-row">{searchForm()}</div>
      {searched && <div>{searchedBlogs(results)}</div>}
    </>
  )
}

export default Search
