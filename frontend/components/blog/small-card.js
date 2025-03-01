import Link from 'next/link'
import { API } from 'config'
import Image from 'next/image'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import htmr from 'htmr'
const SmallCard = ({ blog }) => {
  dayjs.extend(relativeTime)
  // console.log('smallCard', blog)
  return (
    <>
      <div className="small-card w-[300px]">
        <section className="overflow-clip">
          <Link className="inline-block" href={`/blogs/${blog.slug}`}>
            <Image
              // className="max-w-[250px] max-h-[250px]"
              className="related__image w-auto h-auto object-cover transition duration-300 ease-out duration-0 hover:scale-110"
              height={0}
              width={0}
              src={`${API}/api/blog/photo/${blog.slug}`}
              sizes="100vw"
              alt={blog.title}
            />
          </Link>
        </section>
        <div className="small-card__body">
          <section>
            <Link href={`/blogs/${blog.slug}`}>
              <h5>{blog.title}</h5>
            </Link>
            <div className="overflow-x-hidden">{htmr(blog.excerpt)}</div>
          </section>
        </div>
        <div className="small-card__body">
          {
            // <Link
            //   href={`/blogs/${blog.slug}`}
            //   className="bg-green-800 text-white-400 w-full p-[8px] rounded-md"
            // >
            //   Read More
            // </Link>
          }
          <div className="mt-4">
            Posted {dayjs(blog.updatedAt).fromNow()} by{' '}
            <Link href={`/profile/${blog.postedBy.username}`}>
              {blog.postedBy.username}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default SmallCard
