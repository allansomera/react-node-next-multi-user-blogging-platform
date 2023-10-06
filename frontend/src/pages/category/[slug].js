import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { withRouter } from 'next/router'

import { relatedBlogsByCategories } from '@actions/blog'
import { singleCategory } from '@actions/category'

import { API, DOMAIN, APP_NAME } from 'config'
import Card from '@components/blog/card'
import { Button } from '@nextui-org/react'

//you also get router as props by default when you includ withRouter from 'next/router'
const RelatedCategories = ({
  blogs,
  category,
  // totalBlogsByCategory,
  // blogsLimit,
  // blogsSkip,
  router,
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
          content="Programming blogs and tutorials on react node next web development"
        />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta
          property="og:title"
          content={`Latest web development tutorials | ${APP_NAME}`}
        />
        <meta
          property="og:description"
          content="Programming blogs and tutorials on react node next web development"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
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

  // const [limit, setLimit] = useState(blogsLimit)
  // const [skip, setSkip] = useState(0)
  // const [size, setSize] = useState(totalBlogsByCategory)
  // const [loadedBlogs, setLoadedBlogs] = useState([])
  //
  // const loadMore = async () => {
  //   let toSkip = skip + limit
  //   console.log('before limit =>', limit)
  //   console.log('before skip=>', skip)
  //   console.log('before size=>', size)
  //   console.log('before loadedBlogs =>', loadedBlogs)
  //   await relatedBlogsByCategories(toSkip, limit)
  //     .then((data) => {
  //       console.log('loadMore data => ', data)
  //       setLoadedBlogs([...loadedBlogs, ...data.blogs])
  //       setSize(data.size)
  //       setSkip(toSkip)
  //
  //       console.log('current limit =>', limit)
  //       console.log('current skip=>', skip)
  //       console.log('current size=>', size)
  //       console.log('current loadedBlogs =>', loadedBlogs)
  //     })
  //     .catch((error) => {
  //       console.log(error.message)
  //     })
  // }

  //all_count represents the whole count from blogs collection, need to -1 because count starts from 0
  // because skip starts from 0
  // const loadMoreButton = () => {
  //   return (
  //     size > 0 &&
  //     size >= limit &&
  //     skip !== all_count - 1 &&
  //     limit !== all_count &&
  //     limit !== 0 && <Button onClick={loadMore}>Load More</Button>
  //   )
  // }

  // const showLoadedBlogs = () => {
  //   return (
  //     <>
  //       {loadedBlogs.map((blog) => {
  //         return (
  //           <article key={blog._id}>
  //             <Card blog={blog} />
  //           </article>
  //         )
  //       })}
  //     </>
  //   )
  // }

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

  // const showAllCategories = () => {
  //   return (
  //     <>
  //       <div className="flex flex-row">
  //         {categories.map((category, i) => {
  //           return (
  //             <Link key={i} href={`/categories/${category.slug}`}>
  //               <div className="mr-1 border-solid border-1 bg-sky-700 text-white p-2 rounded">
  //                 {category.name}
  //               </div>
  //             </Link>
  //           )
  //         })}
  //       </div>
  //     </>
  //   )
  // }
  // const showAllTags = () => {
  //   return (
  //     <>
  //       <div className="flex flex-row">
  //         {tags.map((tag, i) => {
  //           return (
  //             <Link key={i} href={`/tags/${tag.slug}`}>
  //               <div className="mr-1 border-solid border-1 border-sky-300 bg-transparent text-sky-300 p-2 rounded">
  //                 {`#${tag.name}`}
  //               </div>
  //             </Link>
  //           )
  //         })}
  //       </div>
  //     </>
  //   )
  // }

  return (
    <>
      {head()}
      <main role="main">
        <div className="container-fluid">
          <header>
            <div className="">
              <h1 className="text-center text-5xl font-bold">
                {category.name}
              </h1>
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
          {
            // <div className="blogs__loadmore border-green-200 border-dashed border-1">
            // {showLoadedBlogs()}
            // </div>
            // <div className="blogs__loadmore-btn border-green-200 border-dashed border-1">
            // {loadMoreButton()}
            // </div>
          }
        </div>
      </main>
    </>
  )
}

// after it calls this method and we get a successful response from the backend
// we are able to access the object as props, in this case {blogs, categories, tags, size}
RelatedCategories.getInitialProps = async ({ query }) => {
  //think of skip to be the index of the array, if skip equals to 2, it will start from the 3rd index
  // of the blog
  let skip = 0
  let limit = 0
  // return await listBlogsWithCategoriesAndTags(skip, limit)
  //   .then((data) => {
  //     // console.log('getInitialProps data: ', data)
  //     return {
  //       blogs: data.blogs,
  //       categories: data.categories,
  //       tags: data.tags,
  //       totalBlogs: data.size,
  //       blogsLimit: limit,
  //       blogSkip: skip,
  //       all_count: data.all_count,
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error.message)
  //   })

  // return await relatedBlogsByCategories(query.slug, skip, limit).then(
  //   (data) => {
  //     console.log('related data', data)
  //     return {
  //       blogs: data.blogs,
  //       totalBlogsByCategory: data.size,
  //       blogsLimit: limit,
  //       blogsSkip: skip,
  //     }
  //   }
  // )
  return await singleCategory(query.slug).then((data) => {
    console.log('singleCategory', data)
    return { category: data.category, blogs: data.blogs }
  })
}

export default withRouter(RelatedCategories)
//getInitialProps
