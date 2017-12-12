import axios from 'axios';
import AppConstants from '../contants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import setToken from '../helper/setToken';

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
        localStorage.setItem('token', JSON.stringify((response.data.token)));
        setToken((JSON.parse(localStorage.getItem('token'))));
        localStorage.setItem('isAuthenticated', JSON.stringify(true));
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
        localStorage.setItem('token', JSON.stringify((response.data.token)));
        localStorage.setItem(
          'username',
          JSON.stringify(response.data.userDetails.username)
        );
        setToken((JSON.parse(localStorage.getItem('token'))));
        localStorage.setItem('isAuthenticated', JSON.stringify(true));
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
  * @param {string} ideaLimit string containing ideaLimit
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
  * @param {string} category string containing idea category
  * @param {string} ideaLimit string containing ideaLimit
  * @param {string} offset string containing offset
  * @return {promise} returns server response
  */
  fetchByCategory(category, ideaLimit, offset = 0) {
    return (
      axios
        .get(`/api/v1/users/ideas?category=${category}&offset=${offset}&limit=${ideaLimit}`)
        .then((response) => {
          AppDispatcher.dispatch({ type: AppConstants.CATEGORY, response });
        })
    );
  },

  /**
  * @function myIdeas
  * @description async action that handles all ideas created by a user
  * @param {string} ideaLimit string containing ideaLimit
  * @param {string} offset string containing offset
  * @return {promise} returns server response
  */
  myIdeas(ideaLimit, offset = 0) {
    return (
      axios
        .get(`/api/v1/users/ideas/user/ideas?offset=${offset}&limit=${ideaLimit}`)
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
  * @param {object} searchWord object containing ideaDetails
  * @return {promise} returns server response
  */
  searchIdea(searchWord) {
    return (
      axios
        .get(`/api/v1/users/ideas/search?search=${searchWord}&offset=0&limit=6`)
        .then((response) => {
          AppDispatcher.dispatch({ type: AppConstants.SEARCH_IDEA, response });
        })
    );
  }
};
