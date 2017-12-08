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
  }
};
