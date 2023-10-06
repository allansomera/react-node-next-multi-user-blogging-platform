const Category = require('../models/categoryModel')
const Blog = require('../models/blogModel')
const slugify = require('slugify')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.create = async (req, res) => {
  const { name } = req.body
  let slug = slugify(name).toLowerCase()
  await new Category({ name, slug })
    .save()
    .then((data) => {
      // if (!data) {
      //   throw new Error('Couldnt save category document')
      // }
      res.status(200).json(data)
    })
    .catch((error) => {
      return res.status(400).json({
        error: errorHandler(error),
      })
    })
}

//list all categories
exports.list = async (req, res) => {
  await Category.find({})
    .orFail(() => new Error('No category lists found'))
    .exec()
    .then((data) => {
      //return list of documents
      return res.status(200).json(data)
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      })
    })
}

//list single category based on slug
exports.read = async (req, res) => {
  const slug = req.params.slug.toLowerCase()
  await Category.findOne({ slug })
    .orFail(() => new Error('Category does not exist'))
    .exec()
    .then((category) => {
      //return the found category document
      Blog.find({ categories: { $in: category } })
        .populate('categories', '_id slug name')
        .populate('tags', '_id slug name')
        .populate('postedBy', '_id name')
        .select(
          '_id title slug excerpt categories tags postedBy createdAt updatedAt'
        )
        .exec()
        .then((data) => {
          return res.status(200).json({ category: category, blogs: data })
        })

      // return res.status(200).json(category)
    })
    .catch((error) => {
      return res.status(400).json({ error: error.message })
    })
}
exports.remove = async (req, res) => {
  const slug = req.params.slug.toLowerCase()
  await Category.findOneAndRemove({ slug })
    .orFail(() => {
      new Error('Could not delete category')
    })
    .exec()
    .then((data) => {
      return res
        .status(200)
        .json({ message: `deleted ${slug} successfully`, data })
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      })
    })
}
