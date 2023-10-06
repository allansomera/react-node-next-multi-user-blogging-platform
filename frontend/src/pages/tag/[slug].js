import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { withRouter } from 'next/router'

import { API, DOMAIN, APP_NAME } from 'config'
import Card from '@components/blog/card'
import { Button } from '@nextui-org/react'
import { singleTag } from '@actions/tag'

//you also get router as props by default when you includ withRouter from 'next/router'
const RelatedTags = ({
  blogs,
  tag,
  // totalBlogsByCategory,
  // blogsLimit,
  // blogsSkip,
  router,
  query,
}) => {
  // let all_count = totalBlogsByCategory
  // console.log('blogs =>', blogs)
  // console.log('blogs.categories =>', blogs.categories)
  // console.log('categories =>', categories)
  // console.log('tags =>', tags)
  // console.log('totalBlogs=>', totalBlogs)
  // console.log('all_count=>', all_count)
  // console.log('blogsLimit=>', blogsLimit)
  // console.log('blogSkip=>', blogSkip)

  const head = () => {
    return (
      <Head>
        <title>Programming blogs | {APP_NAME}</title>
        <meta
          name="description"
          content={`Best programming tutorials on ${tag.name}`}
        />
        <link rel="canonical" href={`${DOMAIN}/tag/${query.slug}`} />
        <meta property="og:title" content={`${tag.name}| ${APP_NAME}`} />
        <meta
          property="og:description"
          content={`Best programming tutorials on ${tag.name}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}/tag/${query.slug}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta
          property="og:image"
          content={`${DOMAIN}/static/images/seoblog.jpg`}
        />
        <meta
          property="og:image:secure_url"
          content={`${DOMAIN}/static/images/seoblog.jpg`}
        />
        <meta property="og:image:type" content="image/jpg" />
      </Head>
    )
  }

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

  return (
    <>
      {head()}
      <main role="main">
        <div className="container-fluid">
          <header>
            <div className="">
              <h1 className="text-center text-5xl font-bold">{tag.name}</h1>
            </div>

            {
              // <section className="flex flex-col mt-8 mb-3 gap-2 items-center">
              // {showAllCategories()}
              // {showAllTags()}
              // </section>
            }
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
RelatedTags.getInitialProps = async ({ query }) => {
  //think of skip to be the index of the array, if skip equals to 2, it will start from the 3rd index
  // of the blog
  // let skip = 0
  // let limit = 0
  return await singleTag(query.slug).then((data) => {
    return { tag: data.tag, blogs: data.blogs, query }
  })
}

export default withRouter(RelatedTags)
//getInitialProps
