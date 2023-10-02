import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { withRouter } from 'next/router'

import { singleBlog } from '@actions/blog'

import { API, DOMAIN, APP_NAME } from 'config'
import Card from '@components/blog/card'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import htmr from 'htmr'

// const SingleBlog = ({ blog, router }) => {
const SingleBlog = ({ blog, query }) => {
  dayjs.extend(relativeTime)
  console.log('query => ', query)

  const head = () => {
    return (
      <Head>
        <title>
          {blog.title}| {APP_NAME}
        </title>
        <meta name="description" content={blog.mdesc} />
        <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
        <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
        <meta property="og:description" content={blog.mdesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta
          property="og:image"
          content={`${API}/api/blog/photo/${blog.slug}`}
        />
        <meta
          property="og:image:secure_url"
          content={`${API}/api/blog/photo/${blog.slug}`}
        />
        <meta property="og:image:type" content="image/jpg" />
      </Head>
    )
  }

  const showBlogCategories = () => {
    return (
      <>
        {blog.categories.map((category) => {
          return (
            <article key={category._id}>
              <Link href={`/categories/${category.slug}`}>
                <div className="mr-1 border-solid border-1 bg-sky-700 text-white p-2 rounded">
                  {category.name}
                </div>
              </Link>
            </article>
          )
        })}
      </>
    )
  }

  const showBlogTags = () => {
    return (
      <>
        {blog.tags.map((tag) => {
          return (
            <article key={tag._id}>
              <Link href={`/tags/${tag.slug}`}>
                <div className="mr-1 border-solid border-1 border-sky-300 bg-transparent text-sky-300 p-2 rounded">
                  {`#${tag.name}`}
                </div>
              </Link>
            </article>
          )
        })}
      </>
    )
  }

  return (
    <>
      {head()}
      <main>
        <article>
          <section>
            <div>
              <Image
                className="featured_image"
                src={`${API}/api/blog/photo/${blog.slug}`}
                width={0}
                height={0}
                sizes="100vw"
                alt={blog.title}
                // styles={{ width: '100%', height: 'auto' }}
                // fill
              />
            </div>
          </section>
          <section>
            <h1 className="text-5xl text-center font-bold py-4">
              {blog.title}
            </h1>
            <p className="mark bg-neutral-500 text-black p-2">
              written by {blog.postedBy.name} | published
              {` ${dayjs(blog.updatedAt.toString()).fromNow()}`}
            </p>
            <div className="catgory-tags__container flex mt-2">
              <section className="flex flex-row mb-2">
                {showBlogCategories(blog)}
              </section>
              <section className="flex mb-2">{showBlogTags(blog)}</section>
            </div>
            <div>
              <section className="pb-5 ">
                <div>{htmr(blog.body)}</div>
              </section>
            </div>

            <div className="related-container">
              <h2 className="text-center text-4xl pb-4">Related bogs</h2>
              <hr />
              <p>show related blogs</p>
            </div>

            <div>
              <p>show comments</p>
            </div>
          </section>
        </article>
      </main>
    </>
  )
}

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug)
    .then((data) => {
      // console.log('GET INITIAL PROPS IN SINGLE BLOG', data)
      return { blog: data, query }
    })
    .catch((error) => {
      console.log(error.message)
    })
}

// export default withRouter(SingleBlog) // no need for withRouter because we are not using router
// on client side
export default SingleBlog
