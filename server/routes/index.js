import express from 'express';
import UserController from '../controllers/UserController';
import Validator from '../middlewares/Validator';
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
  Validator,
  UserController.signUp
);

/**
 * Route for signin users to the application
 */
Router.post(
  '/api/v1/user/signin',
  Validator,
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
