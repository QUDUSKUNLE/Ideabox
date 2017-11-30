import express from 'express';
import UserController from '../controllers/UserController';
import validator from '../middlewares/validator';
import ValidateToken from '../middlewares/ValidateToken';


/**
 * Creates express Router
 */
const Router = express.Router();

/**
 * Route for signup users to the application
 */
Router.post(
  '/api/v1/user/signup',
  validator,
  UserController.signUp
);

/**
 * Route for signin users to the application
 */
Router.post(
  '/api/v1/user/signin',
  validator,
  UserController.signIn
);

/**
 * Route for update users profile
 */
Router.put(
  '/api/v1/user/updateprofile',
  ValidateToken,
  UserController.updateProfile
);


export default Router;
