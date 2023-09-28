const Blog = require('../models/blogModel')
const Category = require('../models/categoryModel')
const Tag = require('../models/tagsModel')

const formidable = require('formidable')
const slugify = require('slugify')
const { stripHtml } = require('string-strip-html')
const _ = require('lodash')
const fs = require('fs')
const mongoose = require('mongoose')
const { smartTrim } = require('../helpers/blog')
// const path = require('path')

exports.create = (req, res) => {
  let form = new formidable.IncomingForm({ keepExtensions: true })
  // console.log(form)
  // form.keepExtension = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      })
    }
    console.log('fields => ', fields)
    // console.log('files', files)
    // const { title, body, categories, tags } = fields
    // const photo = fields.photo[0]
    if (!fields.hasOwnProperty('title')) {
      return res.status(400).json({
        error: 'title is required',
      })
    } else if (
      fields.hasOwnProperty('title') &&
      (!fields.title[0] || !fields.title[0].length === 0)
    ) {
      return res.status(400).json({
        error: 'title is required and should not be empty',
      })
    }

    if (!fields.hasOwnProperty('body')) {
      return res.status(400).json({
        error: 'body is required',
      })
    } else if (
      fields.hasOwnProperty('body') &&
      (!fields.body[0] || fields.body[0].length < 200)
    ) {
      return res.status(400).json({
        error: 'Content is too short',
      })
    }

    if (!fields.hasOwnProperty('categories')) {
      return res.status(400).json({
        error: 'category field is required',
      })
    } else if (
      fields.hasOwnProperty('categories') &&
      (!fields.categories[0] || !fields.categories[0].length === 0)
    ) {
      return res.status(400).json({
        error: 'At leaste one Category is required',
      })
    }

    if (!fields.hasOwnProperty('tags')) {
      return res.status(400).json({
        error: 'tag field is required',
      })
    } else if (
      fields.hasOwnProperty('tags') &&
      (!fields.tags[0] || !fields.tags[0].length === 0)
    ) {
      return res.status(400).json({
        error: 'At leaste one tag is required',
      })
    }

    //
    // if (!tags || tags.length === 0) {
    //   return res.status(400).json({
    //     error: 'At least one tag is required',
    //   })
    // }

    const title = fields.title[0]
    const body = fields.body[0]
    const categories =
      fields.categories[0] &&
      fields.categories[0].split(',').map((id) => {
        // console.log('cat id => ', id)
        // console.log('cat typeof id => ', typeof id)
        // console.log('cat len_id => ', id.length)
        // console.log('mongoose: ', new mongoose.Types.ObjectId(id))
        return mongoose.mongo.ObjectId.createFromHexString(id.trim())
      })

    const tags =
      fields.tags[0] &&
      fields.tags[0].split(',').map((id) => {
        // console.log('tag id => ', id)
        // console.log('tag typeof id => ', typeof id)
        // console.log('tag len_id => ', id.length)
        return mongoose.mongo.ObjectId.createFromHexString(id.trim())
      })
    // console.log('categories_val: ', typeof fields.categories[0])
    // console.log('categories_val: ', typeof categories)
    // console.log('tags_val: ', typeof tags)

    // const categories = fields.categories[0] && fields.categories[0].split(',')
    // const tags = fields.tags[0] && fields.tags[0].split(',')

    let blog = new Blog()
    blog.title = title
    blog.body = body
    blog.excerpt = smartTrim(body, 320, ' ', ' ...')
    blog.categories = categories
    blog.tags = tags
    blog.slug = slugify(title).toLowerCase()
    blog.mtitle = `${title} | ${process.env.APP_NAME}`
    blog.mdesc = stripHtml(body.substring(0, 160)).result
    blog.postedBy = req.user._id

    if (files.photo) {
      // console.log('path: ', files.photo)
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size',
        })
      }
      // console.log('files.photo.filepath typeof', typeof files.photo.filepath)
      blog.photo.data = fs.readFileSync(files.photo[0].filepath)
      blog.photo.contentType = files.photo[0].mimetype

      // blog.save().then((result) => {
      //   return res.status(200).json({
      //     result,
      //   })
      //
      //   //commented code block below doesnt work
      //   //   Blog.findByIdAndUpdate(
      //   //     result._id,
      //   //     { $push: { categories: categories } },
      //   //     { new: true }
      //   //   )
      //   //     .exec()
      //   //     .then((_) => {
      //   //       Blog.findByIdAndUpdate(
      //   //         result._id,
      //   //         { $push: { tags: tags } },
      //   //         { new: true }
      //   //       )
      //   //         .exec()
      //   //         .then((_) => {
      //   //           return res.status(200).json(result)
      //   //         })
      //   //         .catch((error) => {
      //   //           return res.status(400).json({ error: error.message })
      //   //         })
      //   //     })
      //   // })
      //   // .catch((error) => {
      //   //   return res.status(400).json({
      //   //     error: error.message,
      //   //   })
      // })
    }

    blog.save().then((result) => {
      return res.status(200).json({
        result,
      })
    })
  })
}

//implement
// list
// read
// remove
exports.list = async (_, res) => {
  await Blog.find({})
    .orFail(() => new Error('Could not get blogs'))
    .exec()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      })
    })
}
