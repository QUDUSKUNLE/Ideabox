import axios from 'axios';
/**
 * @description: This helps to set token to header
 * @param {string} token request object
 * @return {string} response contains validation status
 */
export default (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};
