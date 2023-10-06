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

exports.create = async (req, res) => {
  let form = new formidable.IncomingForm({ keepExtensions: true })
  // console.log(form)
  // form.keepExtension = true
  form.parse(req, async (err, fields, files) => {
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

    await blog.save().then((result) => {
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
  // tutorial way
  // await Blog.find({})
  //   .orFail(() => new Error('Could not get blogs'))
  //   .exec()
  //   .then((data) => {
  //     res.status(200).json(data)
  //   })
  //   .catch((error) => {
  //     return res.status(400).json({
  //       error: error.message,
  //     })
  //   })

  // await Blog.find({})
  //   .populate('categories', '_id name slug')
  //   .populate('tags', '_id name slug')
  //   .populate('postedBy', '_id name username')
  //   .select(
  //     '_id title slug excerpt categories tags postedBy createdAt updatedAt'
  //   )
  //   .orFail(() => new Error('Could not get blogs'))
  //   .exec()
  //   .then((data) => {
  //     return res.status(200).json(data)
  //   })
  //   .catch((error) => {
  //     return res.status(400).json({
  //       error: error.message,
  //     })
  //   })

  // my way just for practice
  await Blog.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        pipeline: [{ $project: { _id: 1, name: 1, slug: 1 } }],
        as: 'categories',
      },
    },
    {
      $lookup: {
        from: 'tags',
        localField: 'tags',
        foreignField: '_id',
        pipeline: [{ $project: { _id: 1, name: 1, slug: 1 } }],
        as: 'tags',
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        slug: 1,
        excerpt: 1,
        categories: 1,
        tags: 1,
        postedBy: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'postedBy',
        foreignField: '_id',
        pipeline: [{ $project: { id: 1, name: 1, username: 1 } }],
        as: 'postedBy',
      },
    },
    { $unwind: '$postedBy' },
  ])
    // .orFail(() => new Error('Could not get blogs'))
    .exec()
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      })
    })
}

exports.listAllBlogsCategoriesTags = async (req, res) => {
  let skip = req.body.skip ? parseInt(req.body.skip) : 0
  let limit = req.body.limit
    ? parseInt(req.body.limit) <= 0
      ? 1
      : parseInt(req.body.limit)
    : 10
  // let limit = req.body.limit ? parseInt(req.body.limit) : 10
  console.log('req.body.skip', req.body.skip)
  console.log('req.body.limit', req.body.limit)
  console.log('skip', skip)
  console.log('limit', limit)

  let blogs
  let categories
  let tags

  await Blog.find({})
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username profile')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select(
      '_id title slug excerpt categories tags postedBy createdAt updatedAt'
    )
    .orFail(() => new Error('Could not get blogs'))
    .exec()
    .then(async (data) => {
      // get all blogs
      blogs = data
      // get all categories
      categories = await Category.find({})
        .orFail(() => new Error('couldnt find categories'))
        .exec()
        .then((cat_data) => {
          return cat_data
        })
        .catch((error) => {
          return res.status(400).json({
            error: error.message,
          })
        })

      tags = await Tag.find({})
        .orFail(() => new Error('couldnt find tags'))
        .exec()
        .then((tag_data) => {
          return tag_data
        })
        .catch((error) => {
          return res.status(400).json({
            error: error.message,
          })
        })

      let all_count = await Blog.estimatedDocumentCount()

      return res
        .status(200)
        .json({ blogs, categories, tags, size: blogs.length, all_count })
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      })
    })
}

exports.singleBlog = async (req, res) => {
  let slug = req.params.slug.toLowerCase()
  // await Blog.findOne({slug})
  await Blog.findOne({ slug: `${slug}` })
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username profile')
    .select(
      '_id title slug body mtitle mdesc categories tags postedBy createdAt updatedAt'
    )
    .orFail(() => new Error(`couldnt find blog with slug => ${slug}`))
    .exec()
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      })
    })
}

exports.remove = async (req, res) => {
  let slug = req.params.slug.toLowerCase()

  await Blog.findOneAndRemove({ slug: `${slug}` })
    .orFail(() => new Error(`could not delete blog with slug => ${slug}`))
    .exec()
    .then((data) => {
      return res.status(200).json({
        message: `blog ${slug} has been successfully deleted`,
        data,
      })
    })
    .catch((error) => {
      return res.status(400).json({ error: error.message })
    })
}
exports.update = async (req, res) => {
  let slug = req.params.slug.toLowerCase()

  await Blog.findOne({ slug })
    .orFail(() => new Error(`could not find blog with slug => ${slug} `))
    .exec()
    .then((old_blog) => {
      let form = new formidable.IncomingForm({ keepExtensions: true })
      form.parse(req, async (_err, fields, files) => {
        let slugBeforeMerge = old_blog.slug
        //
        console.log('update fields', fields)
        let categories
        let tags
        let title
        let body
        let new_fields

        if (fields.hasOwnProperty('categories')) {
          categories =
            fields.categories[0] &&
            fields.categories[0].split(',').map((id) => {
              return mongoose.mongo.ObjectId.createFromHexString(id.trim())
            })
          console.log('form categories', categories)
          new_fields = { ...fields, categories }
        }

        if (fields.hasOwnProperty('tags')) {
          tags =
            fields.tags[0] &&
            fields.tags[0].split(',').map((id) => {
              return mongoose.mongo.ObjectId.createFromHexString(id.trim())
            })
          new_fields = { ...fields, tags }
        }
        if (fields.hasOwnProperty('body')) {
          body = fields.body[0]
          excerpt = smartTrim(body, 320, ' ', ' ...')
          mdesc = stripHtml(body.substring(0, 160)).result
          new_fields = { ...fields, body, excerpt, mdesc }
        }

        // let new_fields =
        //   categories && tags ? { ...fields, categories, tags } : { ...fields }

        // console.log('categories_BE', categories)
        // console.log('tags_BE', tags)

        // if (categories && tags) {
        //   new_fields = { ...fields, categories, tags }
        // } else if (categories) {
        //   new_fields = { ...fields, categories }
        // } else if (tags) {
        //   new_fields = { ...fields, tags }
        // } else {
        //   new_fields = { ...fields }
        // }

        if (fields.hasOwnProperty('title')) {
          title = fields.title[0]
          new_fields = { ...new_fields, title }
        }

        console.log('update new_fields', new_fields)

        // let new_fields = { ...fields, categories, tags }

        // old_blog = _.merge(old_blog, new_fields)

        // this merge will replace the old array with the new array
        old_blog = _.mergeWith(old_blog, new_fields, (_a, b) =>
          _.isObject(b) ? b : undefined
        )

        // fields
        // form categories [
        //   new ObjectId("650663e514ded6d67ea326f5"),
        //   new ObjectId("6506a8dda0624a7eb98e27f7")

        // old_blog = _.mergeWith(old_blog, new_fields)
        // old_blog = { ...old_blog, ...new_fields }
        // old_blog = Object.assign({}, old_blog, new_fields)

        old_blog.slug = slugBeforeMerge

        // const title = fields.title[0]
        // const body = fields.body[0]

        // const { body } = old_blog
        // const new_body = old_blog.body

        // const body = fields.body[0]

        // if (new_body) {
        //   old_blog.excerpt = smartTrim(new_body, 320, ' ', ' ...')
        //   old_blog.mdesc = stripHtml(new_body.substring(0, 160)).result
        //   // console.log('old_blog.mdesc', old_blog.mdesc)
        // }

        if (files.photo) {
          if (files.photo.size > 10000000) {
            return res.status(400).json({
              error: 'Image should be less than 1mb in size',
            })
          }
          old_blog.photo.data = fs.readFileSync(files.photo[0].filepath)
          old_blog.photo.contentType = files.photo[0].mimetype
        }

        // console.log('new_fields', old_blog)
        // return res.json(old_blog)

        await old_blog.save().then((result) => {
          return res.status(200).json({
            result,
          })
        })
      })
    })
}

exports.list_related_categories = async (req, res) => {
  // let cat_slug = req.body.cat_slug
  // let cat_id = mongoose.mongo.ObjectId.createFromHexString(req.body.cat_id)
  let cat_slug = req.body.cat_slug
  let skip = req.body.skip ? parseInt(req.body.skip) : 0
  let limit = req.body.limit
    ? parseInt(req.body.limit) <= 0
      ? 1
      : parseInt(req.body.limit)
    : 10

  let blogs
  await Blog.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        // foreignField: '_id',
        foreignField: '_id',
        pipeline: [{ $project: { _id: 1, name: 1, slug: 1 } }],
        as: 'categories',
      },
    },
    {
      $lookup: {
        from: 'tags',
        localField: 'tags',
        // foreignField: '_id',
        foreignField: '_id',
        pipeline: [{ $project: { _id: 1, name: 1, slug: 1 } }],
        as: 'tags',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'postedBy',
        // foreignField: '_id',
        foreignField: '_id',
        pipeline: [{ $project: { _id: 1, name: 1, username: 1, profile: 1 } }],
        as: 'postedBy',
      },
    },
    { $unwind: '$postedBy' },
    {
      $match: {
        // 'categories._id': new mongoose.Types.ObjectId(cat_id),
        'categories.slug': cat_slug,
        // 'categories._id': cat_id,
      },
    },
    // {
    //   $addFields: {
    //     categories: {
    //       $filter: {
    //         input: '$categories',
    //         as: 'c',
    //         cond: { $eq: ['$$c.slug', cat_slug] },
    //       },
    //     },
    //   },
    // },
    // {
    //   $match: { categories: { $ne: [] } },
    // },
  ])
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    // .select(
    //   '_id title slug excerpt categories tags postedBy createdAt updatedAt'
    // )
    .exec()
    // .orFail(() => new Error('Couldnt find blogs by categories'))
    .then((data) => {
      // let all_count = data.estimatedDocumentCount()
      //   .json({ blogs, categories, tags, size: blogs.length, all_count })
      // console.log('BE data', data)
      blogs = data
      return res.status(200).json({ blogs, size: blogs.length })
    })
    .catch((error) => {
      return res.status(400).json(error.message)
    })
}

// relative to the single blog, check related blogs by category not including
// the current single blog
exports.list_related = async (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 3
  let { _id, categories } = req.body.blog

  // find other blogs not including itself
  await Blog.find({ _id: { $ne: _id }, categories: { $in: categories } })
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate('postedBy', '_id name profile')
    .select('title slug excerpt postedBy createdAt updatedAt')
    .exec()
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      })
    })
}

exports.photo = async (req, res) => {
  let slug = req.params.slug.toLowerCase()
  await Blog.findOne({ slug })
    .select('photo')
    .orFail(() => new Error('no photo found'))
    .exec()
    .then((blog) => {
      res.set('Content-Type', blog.photo.contentType)
      return res.send(blog.photo.data)
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      })
    })
}
