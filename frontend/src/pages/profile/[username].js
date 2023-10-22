import { userPublicProfile, all_user_paths } from '@actions/user'
import axios from 'axios'
import { API, APP_NAME, DOMAIN } from 'config'
import dayjs from 'dayjs'
import Head from 'next/head'
import Link from 'next/link'

import relativeTime from 'dayjs/plugin/relativeTime'

const UserProfile = ({ user, blogs, query }) => {
  dayjs.extend(relativeTime)

  const showUserBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <>
          <div key={blog._id + i}>
            <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
          </div>
        </>
      )
    })
  }

  const head = () => {
    return (
      <Head>
        <title>
          {user.name} | {APP_NAME}
        </title>
        <meta name="description" content={`Blogs by ${user.username}`} />
        <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
        <meta property="og:title" content={`${user.username}| ${APP_NAME}`} />
        <meta
          property="og:description"
          content={`Best programming tutorials on ${user.username}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${DOMAIN}/profile/${query.username}`}
        />
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
  return (
    <>
      {head()}
      <div className="container">
        <div className="row flex flex-col">
          <div className="col flex flex-col border-dashed border-1 border-green-400 w">
            <div className="card">
              <div className="card__body">
                <h5>{user.name}</h5>
                <Link href={`${user.profile}`}>View Profile</Link>
                <p>Joined {dayjs(user.createdAt).fromNow()}</p>
              </div>
            </div>
          </div>
          <div className="inner_col flex flex-row gap-4">
            <div className="border-1 border-solid border-red-300 w-full flex flex-col items-center">
              <div className="text-2xl bg-blue-500 px-[40px] w-1/2 my-3 p-[15px]">
                Recent blogs by {user.name}
              </div>
              <div className="w-1/2 my-2">{showUserBlogs()}</div>
            </div>
            <div className="w-full border-1 border-dashed border-blue-200">
              contact form
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async (context) => {
  let query = context.params
  console.log('query', query)
  let result = await userPublicProfile(context.params.username).then((data) => {
    // console.log('getStaticProps data => ', data)

    return {
      user: data.user,
      blogs: data.blogs,
      query,
    }
  })

  return {
    props: result,
  }
  // return {
  //   props,
  // }
}

export const getStaticPaths = async () => {
  // let obj = {}
  //
  // console.log('obj', obj)
  // let all_usernames = username_paths?.map((user) => ({
  //   params: { username: user.username },
  // }))
  // console.log('all_usernames => ', all_usernames)

  // let data = await all_user_paths()
  let p = await all_user_paths().then((data) => {
    return data
  })

  // console.log('p', p)
  let username_paths = p.map((user) => {
    return { params: { username: `${user.username}` } }
  })

  return {
    paths: username_paths,
    fallback: true,
  }
}
export default UserProfile
