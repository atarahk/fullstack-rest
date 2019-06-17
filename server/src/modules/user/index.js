import express from 'express';
import middleware from '../../middlewares/validators';
import UserController from './UserController';

const Router = express.Router();

Router.post(
  '/signup',
  middleware.validateUserSignUp,
  UserController.signUpUser,
);

Router.post(
  '/login',
  middleware.validateUserLogin,
  UserController.loginUser,
);

export default Router;
