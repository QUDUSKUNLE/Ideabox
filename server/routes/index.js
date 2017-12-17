import express from 'express';
import CommentController from '../controllers/CommentController';
import IdeaController from '../controllers/IdeaController';
import UserController from '../controllers/UserController';
import validateRequest from '../middlewares/validateRequest';
import verifyToken from '../middlewares/verifyToken';


/**
 * Creates express Router
 */
const route = express.Router();

/**
 * Route for signup users
 */
route.post(
  '/signup',
  validateRequest,
  UserController.signUp
);

/**
 * Route for signin users
 */
route.post(
  '/signin',
  validateRequest,
  UserController.signIn
);

/**
 * Route for users to request for password reset
 */
route.post(
  '/passwords',
  validateRequest,
  UserController.resetPassword
);

/**
 * Route for users to update password
 */
route.put(
  '/passwords/:hash',
  validateRequest,
  UserController.updatePassword
);

/**
 * Route for users to update profile
 */
route.put(
  '/profiles',
  verifyToken,
  UserController.updateProfile
);

/**
 * Create ideas endpoint
 */
route.post(
  '/ideas',
  verifyToken,
  validateRequest,
  IdeaController.createIdea
);

/**
 * Edit idea endpoint
 * Edit idead by its id
 */
route.put(
  '/ideas/:ideaId',
  verifyToken,
  validateRequest,
  IdeaController.editIdea
);

/**
 * Route to Delete ideas
 * Delete idea by id
 */
route.delete(
  '/ideas/:ideaId',
  verifyToken,
  IdeaController.deleteIdea
);

/**
 * Fetch all public ideas endpoint
 */
route.get(
  '/ideas/public',
  verifyToken,
  IdeaController.publicIdea
);

/**
 * Route to Filter ideas by category
 */
route.get(
  '/ideas',
  verifyToken,
  IdeaController.filterIdeas
);

/**
 * Route to search for ideas
 */
route.get(
  '/ideas/search',
  verifyToken,
  IdeaController.searchIdeas
);

/**
 * Route to fetch an idea
 * Fetch Idea by Id
 */
route.get(
  '/ideas/:ideaId',
  verifyToken,
  IdeaController.fetchIdea
);


/**
 * Route to fetch user Ideas
 * Fetch by user Id
 * user Id is gotten from verifyToken
 */
route.get(
  '/ideas/user/ideas',
  verifyToken,
  IdeaController.userIdeas
);

/**
 * Route to write a comment
 */
route.post(
  '/comments/:ideaId',
  verifyToken,
  validateRequest,
  CommentController.writeComment
);

/**
 * Route to fetch comments of a particular idea
 */
route.get(
  '/comments/:ideaId',
  verifyToken,
  CommentController.fetchComment
);

/**
 * Route to edit a comment
 */
route.put(
  '/comments/:commentId',
  verifyToken,
  validateRequest,
  CommentController.editComment
);

/**
 * Route to delete a comment
 */
route.delete(
  '/comments/:commentId',
  verifyToken,
  CommentController.deleteComment
);

export default route;
