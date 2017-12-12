
/**
 * @description: This helps to set localStorage
 * @param {Object} response server response
 * @return {void} response contains validation status
 */
export default (response) => {
  if (response) {
    localStorage.setItem('token', JSON.stringify((response.data.token)));
    localStorage.setItem(
      'username',
      JSON.stringify(response.data.userDetails.username)
    );
    localStorage.setItem(
      'userDetails',
      JSON.stringify(response.data.userDetails)
    );
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
  }
};

