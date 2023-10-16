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

exports.update_profile = (req, res) => {
  let form = new formidable.IncomingForm({ keepExtension: true })
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Photo could not be uploaded',
      })
    }
    let user = req.profile
    user = _.extend(user, fields)
    if (files.photo) {
      if (files.photo.size > 100000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb',
        })
      }
      user.photo.data = fs.readFileSync(files.photo.path)
      user.photo.contentType = files.photo.type
      user.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: error.message,
          })
        }
        user.hashed_password = undefined
        res.json(user)
      })
    }
  })
}
exports.photo = (req, res) => {
  const username = req.params.username
  User.findOne({ username })
    .orFail(() => new Error('User not found'))
    .exec()
    .then((user) => {
      if (user.photo.data) {
        res.set('Content-Type', user.photo.contentType)
        return res.send(user.photo.data)
      }
    })
    .catch((error) => {
      error: error.message
    })
}
