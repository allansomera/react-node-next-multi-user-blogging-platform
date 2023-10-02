import Link from 'next/link'
import { API } from 'config'
import Image from 'next/image'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import htmr from 'htmr'
const Card = ({ blog }) => {
  dayjs.extend(relativeTime)

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
      <div className="border-red-500 border-dashed border-1">
        <header>
          <Link href={`/blogs/${blog.slug}`}>
            <h2 className="p-3 text-blue-500 text-3xl font-bold">
              {blog.title}
            </h2>
          </Link>
        </header>
        <section>
          <p className="mark bg-neutral-500 text-black p-2 mb-2">
            written by {blog.postedBy.name} | published
            {` ${dayjs(blog.updatedAt.toString()).fromNow()}`}
          </p>
        </section>
        <div className="catgory-tags__container flex ml-2 mb-3">
          <section className="flex flex-row mb-2">
            {showBlogCategories(blog)}
          </section>
          <section className="flex mb-2">{showBlogTags(blog)}</section>
        </div>
        <div className="flex flex-row ml-2">
          <div>
            <Image
              // className="max-w-[250px] max-h-[250px]"
              className="w-auto h-auto"
              height={250}
              width={250}
              src={`${API}/api/blog/photo/${blog.slug}`}
              alt={blog.title}
            />
          </div>
          <div className="w-3/4 max-w-32 h-auto px-4 py-4 border-dashed border-1 border-blue-500">
            <section className="pb-5 ">
              <div>{htmr(blog.excerpt)}</div>
            </section>
            <Link
              href={`/blog/${blog.slug}`}
              className="bg-green-800 text-white-400 w-full p-[8px] rounded-md"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default Card
