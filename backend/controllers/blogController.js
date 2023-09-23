const Blog = require('../models/blogModel')
const Category = require('../models/categoryModel')
const Tag = require('../models/tagsModel')

const formidable = require('formidable')
const slugify = require('slugify')
const stripHtml = require('slugify')
const _ = require('lodash')
const fs = require('fs')
// const path = require('path')

exports.create = async (req, res) => {
  let form = new formidable.IncomingForm({ keepExtensions: true })
  // console.log(form)
  // form.keepExtension = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not upload',
      })
    }
    // console.log('fields => ', fields)
    // console.log('files', files)
    // const { title, body, categories, tags } = fields
    const title = fields.title[0]
    const body = fields.body[0]
    // const photo = fields.photo[0]
    let blog = new Blog()
    blog.title = title
    blog.body = body
    blog.slug = slugify(title).toLowerCase()
    blog.mtitle = `${title} | ${process.env.APP_NAME}`
    blog.mdesc = stripHtml(body.substring(0, 160))
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

      await blog
        .save()
        .then((result) => {
          return res.status(200).json({
            result,
          })
        })
        .catch((error) => {
          return res.status(400).json({
            error: error.message,
          })
        })
    }
  })
}
