import React from 'react';
import ReactDOM from 'react-dom';
import setToken from '../helper/setToken';
import Routes from '../components/routes/Routes';
import './css/index.scss';

/**
 * Contains Routes to all my components
 */

if (localStorage.token) {
  setToken(JSON.parse(localStorage.getItem('token')));
}

ReactDOM.render(<Routes />, document.getElementById('app'));
