const express = require('express')
const middleware = require('../../middlewares/validators')
const UserController = require('./UserController')

const Router = express.Router()

Router.post('/signup', middleware.validateUserSignUp, UserController.signUpUser)

Router.post('/login', middleware.validateUserLogin, UserController.loginUser)

export default Router
