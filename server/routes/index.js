import express from 'express';
import CommentController from '../controllers/CommentController';
import IdeaController from '../controllers/IdeaController';
import UserController from '../controllers/UserController';
import validateRequest from '../middlewares/validateRequest';
import verifyToken from '../middlewares/verifyToken';


/**
 * Creates express Router
 */
const Router = express.Router();

/**
 * Route for signup users
 */
Router.post(
  '/signup',
  validateRequest,
  UserController.signUp
);

/**
 * Route for signin users
 */
Router.post(
  '/signin',
  validateRequest,
  UserController.signIn
);

/**
 * Route for users to request for password reset
 */
Router.post(
  '/passwords',
  validateRequest,
  UserController.resetPassword
);

/**
 * Route for users to update profile
 */
Router.put(
  '/profiles/:userId',
  verifyToken,
  UserController.updateProfile
);


/**
 * Route for users to update password
 */
Router.put(
  '/passwords/:hash',
  validateRequest,
  UserController.updatePassword
);

/**
 * Route to create ideas
 */
Router.post(
  '/ideas',
  verifyToken,
  validateRequest,
  IdeaController.createIdea
);

/**
 * Route to Edit ideas
 */
Router.put(
  '/ideas/:ideaId',
  verifyToken,
  validateRequest,
  IdeaController.editIdea
);

/**
 * Route to Delete ideas
 */
Router.delete(
  '/ideas/:ideaId',
  verifyToken,
  IdeaController.deleteIdea
);

/**
 * Route to Search for ideas by category &
 * Filter ideas
 */
Router.get(
  '/ideas',
  verifyToken,
  IdeaController.searchIdea
);

/**
 * Route to write a comment
 */
Router.post(
  '/comments/:ideaId',
  verifyToken,
  validateRequest,
  CommentController.writeComment
);

/**
 * Route to search for ideas
 */
Router.post(
  '/ideas/search',
  verifyToken,
  validateRequest,
  IdeaController.filterIdeas
);

/**
 * Route to edit a comment
 */
Router.put(
  '/comments/:commentId',
  verifyToken,
  validateRequest,
  CommentController.editComment
);

/**
 * Route to delete a comment
 */
Router.delete(
  '/comments/:commentId',
  verifyToken,
  CommentController.deleteComment
);

export default Router;
