const User = require('../models/userModel')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['H256'],
  userProperty: 'auth',
})
exports.signup = async (req, res) => {
  // res.json({ time: Date().toString() })
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
      const newUser = await user.save() // writes to database

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

exports.signin = async (req, res) => {
  // check if user exsist

  // const { email, password } = req.body

  //find user with using the email
  await User.findOne({ email: req.body.email }).then((user) => {
    try {
      if (!user) {
        throw new Error('User with that email does not exist. Please sign up')
      }

      // authenticate
      if (!user.authenticate(req.body.password)) {
        throw new Error('Email and Password do not match')
      }
      // generate a token and send to client, use the user._id to sign the token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      })
      res.cookie('token', token, { expiresIn: '1d' })
      const { _id, username, email, name, role } = user
      return res.json({
        token,
        user: { _id, username, email, name, role },
      })
    } catch (e) {
      return res.status(400).json({
        error: e,
      })
    }
  })
}
