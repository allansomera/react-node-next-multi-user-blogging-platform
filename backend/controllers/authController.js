const User = require('../models/userModel')
const Blog = require('../models/blogModel')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const { expressjwt: expressJWT } = require('express-jwt')

exports.signup = async (req, res) => {
  // res.json({ time: Date().toString() })
  console.log('req.body', req.body)
  const { name, email, password } = req.body

  // const user = await User.findOne({ email: email })
  // console.log('user', user)

  // await User.findOne({ email: email }).then((user) => {
  //   console.log('user: ', user)
  // })

  //find if user exist
  await User.findOne({ email: email }).then(async (elem) => {
    if (elem) {
      return res.status(400).json({
        error: 'email is taken',
      })
    }

    //if user does not exist, create new user
    // username short id
    let username = shortId.generate()
    // create profile link
    let profile = `${process.env.CLIENT_URL}/profile/${username}`

    let user = new User({
      name,
      email,
      password,
      profile,
      username,
    })

    try {
      // user.password = password // alternative way to handle setters, triggers on assignment
      const newUser = await user.save() // writes to database, password is virtual and will deal
      // with hashing the password, the passed 'password'
      // will not be saved in the database, only the hashed version

      //if newUser was successfully saved
      if (newUser) {
        // return res
        //   .status(201)
        //   .json({ message: 'created new user', user: newUser })
        res.json({
          message: 'Signup successful! Please sign in',
        })
      }
    } catch (error) {
      return res.status(400).json({
        error_msg: error,
      })
    }
    // else {
    //   return res.status(400).json({
    //     error: 'cant create user',
    //   })
    // }
    // newUser.save((err, success) => {
    //   if (err) {
    //     return res.status(400).json({
    //       error: err,
    //     })
    //   }
    //   res.json({
    //     user: success,
    //   })
    //   // res.json({
    //   //   message: 'Signup success! please signin'
    //   // })
    // })
  })

  // const user = await User.create({
  //   username: name,
  //   // name: name,
  //   email: email,
  // })

  // res.status(201).json({ user: 'ok' })
}

exports.signin = (req, res) => {
  // check if user exsist

  // const { email, password } = req.body

  //find user with using the email
  User.findOne({ email: req.body.email })
    .orFail(
      () => new Error('User with that email does not exist. Please sign up')
    )
    .then((user) => {
      // if (!user) {
      //   console.log('in api/singin => if!user()')
      //   throw new Error('User with that email does not exist. Please sign up')
      // }

      // authenticate
      if (!user.authenticate(req.body.password)) {
        throw new Error('Email and Password do not match')
      }
      // generate a token and send to client, use the user._id to sign the token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        // const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1d',
      })
      res.cookie('token', token, { expiresIn: '1d' })
      const { _id, username, email, name, role } = user
      return res.json({
        token,
        user: { _id, username, email, name, role },
      })
    })
    .catch((error) => {
      console.log('error => ', error)
      // let e = error
      return res.status(400).json({
        error: error.message,
      })
    })
}

exports.signout = (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Signout success' })
}

// it will take the token's secret and compare with the JWT_SECRET key
// setup in the env file
exports.requireSignin = expressJWT({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'user',
})

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id
  User.findById({ _id: authUserId })
    .orFail(() => new Error('User not found'))
    .then((user) => {
      req.profile = user
      next()
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      })
    })
}

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id
  User.findById({ _id: adminUserId })
    .orFail(() => new Error('User not found'))
    .then((user) => {
      if (user.role !== 1) {
        return res.status(400).json({
          error: 'Admin resource. Access denied',
        })
      }
      req.profile = user
      next()
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      })
    })
}

exports.can_update_delete_blog = (req, res, next) => {
  const slug = req.params.slug.toLowerCase()
  Blog.findOne({ slug })
    .exec()
    .then((data) => {
      // console.log('data.postedBy._id', data.postedBy._id)
      // console.log('req.profile._id', req.profile._id)
      // console.log('compare _id: ', data.postedBy._id === req.profile._id)
      let authorizedUser = data.postedBy._id.equals(req.profile._id)
      if (!authorizedUser) {
        return res.status(400).json({
          error: 'You are not authorized',
        })
      }
      next()
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      })
    })
}
