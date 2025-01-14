const Tag = require('../models/tagsModel')
const Blog = require('../models/blogModel')
const slugify = require('slugify')

exports.create = async (req, res) => {
  const { name } = req.body
  console.log('tag name: ', name)
  let slug = slugify(name).toLowerCase()
  await new Tag({ name, slug })
    .save()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      })
    })
}

exports.listTags = async (_, res) => {
  await Tag.find({})
    .orFail(() => new Error('Could not get tags'))
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

exports.read = async (req, res) => {
  const slug = req.params.slug.toLowerCase()
  await Tag.findOne({ slug })
    .orFail(() => new Error(`Could not get tag ${slug}`))
    .exec()
    .then((tag) => {
      Blog.find({ tags: { $in: tag } })
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name')
        .select(
          '_id title slug excerpt categories tags postedBy createdAt updatedAt'
        )
        .sort({ createdAt: -1 })
        .exec()
        .then((data) => {
          console.log('tag.read', data)
          return res.json({ tag: tag, blogs: data })
        })
      // res.status(200).json(data)
    })
    .catch((error) => {
      return res.status(400).json({ error: error.message })
    })
}

exports.remove = async (req, res) => {
  const slug = req.params.slug.toLowerCase()
  await Tag.findOneAndRemove({ slug })
    .orFail(() => new Error(`Could not delete ${slug}`))
    .exec()
    .then((data) => {
      res
        .status(200)
        .json({ message: `Successfully deleted ${slug}`, tag: data })
    })
    .catch((error) => {
      return res.status(400).json({ error: error.message })
    })
}
