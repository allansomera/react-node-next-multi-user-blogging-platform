const { Schema, model, models } = require('mongoose')
const crypto = require('crypto')

const { ObjectId } = Schema

const blogSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 160,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    body: {
      type: {},
      required: true,
      min: 200,
      max: 2000000,
    },
    excerpt: {
      type: String,
      max: 1000,
    },
    mtitle: {
      type: String,
    },
    mdesc: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    categories: [{ type: ObjectId, ref: 'Category', required: true }],
    tags: [{ type: ObjectId, ref: 'Tag', required: true }],
    postedBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true, strict: true, strictQuery: true }
)

const Blog = models?.Blog || model('Blog', blogSchema)

module.exports = Blog
