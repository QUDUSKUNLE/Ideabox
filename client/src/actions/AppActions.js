import axios from 'axios';
import AppConstants from '../contants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import setToken from '../helper/setToken';


export default {

/**
 * @function signUpUser
 * @description async action to handle user signup
 * @return {promise} returns server response
 * @param {object} userData object containing data submitted by user
 */
  signUpUser(userData) {
    return axios.post('/api/v1/users/signup', userData)
      .then((response) => {
        AppDispatcher.dispatch({ type: AppConstants.SIGN_UP, response });
        localStorage.setItem('token', JSON.stringify(response.data.token));
        setToken(JSON.parse(localStorage.getItem('token')));
      });
  }
};
