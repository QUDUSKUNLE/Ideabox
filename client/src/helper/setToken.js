import axios from 'axios';
/**
 * @description: This helps to set token to header
 * @param {Object} token request object
 * @return {Object} response contains validation status
 */
export default (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

