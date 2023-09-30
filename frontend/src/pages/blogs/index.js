import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

import { listBlogsWithCategoriesAndTags } from '@actions/blog'

import { API } from 'config'
import Card from '@components/blog/card'

const Blogs = ({ blogs, categories, tags, size }) => {
  console.log('blogs =>', blogs)
  console.log('blogs.categories =>', blogs.categories)
  console.log('categories =>', categories)
  console.log('tags =>', tags)
  console.log('size=>', size)

  const showAllBlogs = () => {
    return (
      <>
        {blogs.map((blog) => {
          return (
            <article key={blog._id}>
              <Card blog={blog} />
            </article>
          )
        })}
      </>
    )
  }

  const showAllCategories = () => {
    return (
      <>
        <div className="flex flex-row">
          {categories.map((category, i) => {
            return (
              <Link key={i} href={`/categories/${category.slug}`}>
                <div className="mr-1 border-solid border-1 bg-sky-700 text-white p-2 rounded">
                  {category.name}
                </div>
              </Link>
            )
          })}
        </div>
      </>
    )
  }
  const showAllTags = () => {
    return (
      <>
        <div className="flex flex-row">
          {tags.map((tag, i) => {
            return (
              <Link key={i} href={`/tags/${tag.slug}`}>
                <div className="mr-1 border-solid border-1 border-sky-300 bg-transparent text-sky-300 p-2 rounded">
                  {`#${tag.name}`}
                </div>
              </Link>
            )
          })}
        </div>
      </>
    )
  }

  return (
    <>
      <main role="main">
        <div className="container-fluid">
          <header>
            <div className="">
              <h1 className="text-center text-5xl font-bold">
                programming blog and tutorials
              </h1>
            </div>
            <section className="flex flex-col mt-8 mb-3 gap-2 items-center">
              {showAllCategories()}
              {showAllTags()}
            </section>
          </header>
        </div>
        <div className="blogs">
          <h1> Blogs </h1>
          <div className="blogs__container border-green-200 border-dashed border-1">
            {showAllBlogs()}
          </div>
        </div>
      </main>
    </>
  )
}

// after it calls this method and we get a successful response from the backend
// we are able to access the object as props, in this case {blogs, categories, tags, size}
Blogs.getInitialProps = async () => {
  return await listBlogsWithCategoriesAndTags()
    .then((data) => {
      // console.log('getInitialProps data: ', data)
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        size: data.size,
      }
    })
    .catch((error) => {
      console.log(error.message)
    })
}

export default Blogs
//getInitialProps
