const User = require('../models/userModel')
const Blog = require('../models/blogModel')

exports.read = (req, res) => {
  req.profile.hashed_password = undefined
  return res.json(req.profile)
}

exports.publicProfile = (req, res) => {
  let username = req.params.username
  // console.log('username', username)
  let user
  let blogs

  User.findOne({ username })
    .select('_id name email profile username')
    .exec()
    // .orFail(() => new Error('no user found in database'))
    .then((userFromDB) => {
      user = userFromDB
      let userID = user._id
      // console.log('userID', userID)

      Blog.find({ postedBy: userID })
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .limit(10)
        .select(
          '_id title slug excerpt categories tags postedBy createdAt updatedAt'
        )
        .exec()
        .then((data) => {
          // console.log('blog data => ', data)
          user.photo = undefined
          res.status(200).json({
            user,
            blogs: data,
          })
        })
        .catch((error) => {
          return res.status(400).json({
            error: error.message,
          })
        })
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      })
    })
}

exports.all_users = (_req, res) => {
  User.find({})
    .select('username -_id')
    .exec()
    .then((data) => {
      return res.status(200).json(data)
    })
}
