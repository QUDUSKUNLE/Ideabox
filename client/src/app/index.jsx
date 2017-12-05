import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import Home from '../components/Home';
import './css/index.scss';

window.jQuery = $;
window.$ = $;


ReactDOM.render(<Home />, document.getElementById('app'));

