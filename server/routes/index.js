import express from 'express';
import UserController from '../controllers/UserController';
import validateRequest from '../middlewares/validateRequest';
import verifyToken from '../middlewares/verifyToken';


/**
 * Creates express Router
 */
const Router = express.Router();

/**
 * Route for signup users to the application
 */
Router.post(
  '/api/v1/user/signup',
  validateRequest,
  UserController.signUp
);

/**
 * Route for signin users to the application
 */
Router.post(
  '/api/v1/user/signin',
  validateRequest,
  UserController.signIn
);

/**
 * Route for update users profile
 */
Router.put(
  '/api/v1/user/updateprofile',
  verifyToken,
  UserController.updateProfile
);


export default Router;
