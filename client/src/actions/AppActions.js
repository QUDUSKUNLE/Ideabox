import axios from 'axios';
import AppConstants from '../contants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import setToken from '../helper/setToken';
import setStorage from '../helper/setStorage';

export default {
/**
 * @function signUpUser
 * @description async action to handle user signup
 * @return {promise} returns server response
 * @param {object} userDetail object containing
 * user email, password and username
 */
  signUpUser(userDetail) {
    return axios.post('/api/v1/users/signup', userDetail)
      .then((response) => {
        setStorage(response);
        setToken((JSON.parse(localStorage.getItem('token'))));
        AppDispatcher.dispatch({ type: AppConstants.SIGN_UP, response });
      });
  },

  /**
  * @function logInUser
  * @description async action to handle user log in
  * @return {promise} returns server response
  * @param {object} userDetail object containing
  * user email and password
  */
  logInUser(userDetail) {
    return axios.post('/api/v1/users/signin', userDetail)
      .then((response) => {
        setStorage(response);
        setToken((JSON.parse(localStorage.getItem('token'))));
        AppDispatcher.dispatch({ type: AppConstants.LOG_IN, response });
      });
  },

  /**
  * @function resetPassword
  * @description async action to handle user reset password
  * @return {promise} returns server response
  * @param {object} userEmail object containing user email
  */
  resetPassword(userEmail) {
    return axios.post('/api/v1/users/passwords', userEmail)
      .then((response) => {
        AppDispatcher.dispatch({ type: AppConstants.RESET_PASSWORD, response });
      });
  },

  /**
  * @function createIdea
  * @description async action to handle user reset password
  * @return {promise} returns server response
  * @param {object} ideaDetails object containing user email
  */
  createIdea(ideaDetails) {
    return axios.post('/api/v1/users/ideas', ideaDetails)
      .then((response) => {
        AppDispatcher.dispatch({ type: AppConstants.CREATE_IDEA, response });
      });
  },

  /**
  * @function getPublicIdeas
  * @description async action that handles all public ideas
  * @param {num} ideaLimit string containing ideaLimit
  * @param {num} offset query offset
  * @return {promise} returns server response
  */
  getPublicIdeas(ideaLimit, offset = 0) {
    return (
      axios
        .get(`/api/v1/users/ideas/public?offset=${offset}&limit=${ideaLimit}`)
        .then((response) => {
          AppDispatcher.dispatch({ type: AppConstants.PUBLIC_IDEAS, response });
        })
    );
  },

  /**
  * @function fetchByCategory
  * @description async action that handles ideas by category
  * @param {string} cat string containing idea category
  * @param {num} limit string containing ideaLimit
  * @param {num} off string containing offset
  * @return {promise} returns server response
  */
  fetchByCategory(cat, limit, off = 0) {
    return (
      axios
        .get(`/api/v1/users/ideas?category=${cat}&offset=${off}&limit=${limit}`)
        .then((response) => {
          AppDispatcher.dispatch({ type: AppConstants.CATEGORY, response });
        })
    );
  },

  /**
  * @function myIdeas
  * @description async action that handles all ideas created by a user
  * @param {num} limit string containing ideaLimit
  * @param {num} offset string containing offset
  * @return {promise} returns server response
  */
  myIdeas(limit, offset = 0) {
    return (
      axios
        .get(`/api/v1/users/ideas/user/ideas?offset=${offset}&limit=${limit}`)
        .then((response) => {
          AppDispatcher.dispatch({ type: AppConstants.MY_IDEAS, response });
        })
    );
  },

  /**
  * @function deleteIdea
  * @description async action that handles delete of an idea
  * @param {string} ideaId string containing ideaLimit
  * @return {promise} returns server response
  */
  deleteIdea(ideaId) {
    return (
      axios
        .delete(`/api/v1/users/ideas/${ideaId}`)
        .then((response) => {
          AppDispatcher.dispatch({ type: AppConstants.DELETE_IDEA, response });
        })
    );
  },

  /**
  * @function updateIdea
  * @description async action that handles idea update
  * @param {object} ideaDetails object containing ideaDetails
  * @return {promise} returns server response
  */
  updateIdea(ideaDetails) {
    return (
      axios
        .put(`/api/v1/users/ideas/${ideaDetails.ideaId}`, ideaDetails)
        .then((response) => {
          AppDispatcher.dispatch({ type: AppConstants.UPDATE_IDEA, response });
        })
    );
  },

  /**
  * @function searchIdea
  * @description async action that handles search for ideas
  * @param {string} search search keyword
  * @return {promise} returns server response
  */
  searchIdea(search) {
    return (
      axios
        .get(`/api/v1/users/ideas/search?search=${search}&offset=0&limit=6`)
        .then((response) => {
          AppDispatcher.dispatch({ type: AppConstants.SEARCH_IDEA, response });
        })
    );
  },

  /**
  * @function updateProfile
  * @description async action that handles updateProfile of users
  * @param {string} userDetails userDetails
  * @return {promise} returns server response
  */
  updateProfile(userDetails) {
    return (
      axios
        .put('/api/v1/users/profiles', userDetails)
        .then((response) => {
          AppDispatcher.dispatch({
            type: AppConstants.UPDATE_PROFILE, response
          });
        })
    );
  },

  /**
  * @function fetchIdea
  * @description async action that handles updateProfile of users
  * @param {string} ideaId Idea Identity
  * @return {promise} returns server response
  */
  fetchIdea(ideaId) {
    return (
      axios
        .get(`/api/v1/users/ideas/${ideaId}`)
        .then((response) => {
          AppDispatcher.dispatch({
            type: AppConstants.FETCH_IDEA, response
          });
        })
    );
  },

  /**
  * @function sendComment
  * @description async action that handles send comment
  * @param {string} comment comment
  * @return {promise} returns server response
  */
  sendComment(comment) {
    return (
      axios
        .post(`/api/v1/users/comments/${comment.ideaId}`, comment)
        .then((response) => {
          AppDispatcher.dispatch({
            type: AppConstants.CREATE_COMMENT, response
          });
        })
    );
  },

  /**
  * @function fetchComment
  * @description async action that fetch comments of idea
  * @param {string} ideaId comment
  * @return {promise} returns server response
  */
  fetchComment(ideaId) {
    return (
      axios
        .get(`/api/v1/users/comments/${ideaId}`)
        .then((response) => {
          AppDispatcher.dispatch({
            type: AppConstants.FETCH_COMMENT, response
          });
        })
    );
  }
};
