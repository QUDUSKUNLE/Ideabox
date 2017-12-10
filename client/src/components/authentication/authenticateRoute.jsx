import React from 'react';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';

export default (Component) => {
  /**
   * Protect other component from unauthenticated users
   * @class AuthComponent
   * @extends {AuthComponent}
   */
  class AuthComponent extends React.Component {
    /**
     * Creates an instance of Authenticate
     * @constructor
     * @param {any} props
     * @memberof AuthComponent
     */
    constructor(props) {
      super(props);
      this.state = {
        expiredToken: null
      };
    }

    /**
     * Life Cycle method to be called before a component mounts
     * @method componentWillMount
     * @return {void} void
     */
    componentWillMount() {
      const getToken = JSON.parse(localStorage.getItem('token'));
      const isAuthenticated = (
        JSON.parse(localStorage.getItem('isAuthenticated')));
      if (!isAuthenticated) {
        this.props.history.push('/');
      }
      if (getToken) {
        if (this.isTokenExpired() === true) {
          this.setState({ expiredToken: true });
          this.props.history.push('/');
          Materialize.toast(
            'Your session has expired. Please, log in',
            2000, 'rounded red'
          );
          localStorage.clear();
        }
      }
    }
    /**
     * Life cycle method to be called after a component mounts
     * @method componentDidMount
     * @return {void} void
     */
    componentDidMount() {
      const isAuthenticated = (
        JSON.parse(localStorage.getItem('isAuthenticated')));
      if (!isAuthenticated) {
        this.props.history.push('/');
      }
    }

    /**
     * Check if token has expired
     * @method isTokenExpired
     * @return {void}
     */
    isTokenExpired() {
      const token = jwt.decode(JSON.parse(localStorage.getItem('token')));
      const date = token.exp;
      this.setState({
        expiredToken: date < Date.now() / 1000,
      });
      return date < Date.now() / 1000;
    }

    /**
     * Display the DOM Component
     * @method render
     * @return {DOM} DOM Component
     */
    render() {
      const isAuthenticated =
        JSON.parse(localStorage.getItem('isAuthenticated'));
      if (!isAuthenticated || this.state.expiredToken === true) {
        return null;
      }
      return (
        <Component {...this.props} />
      );
    }
  }
  AuthComponent.propTypes = {
    history: PropTypes.object.isRequired
  };
  return AuthComponent;
};

