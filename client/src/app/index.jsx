import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import HomePage from '../components/home/HomePage';
import './css/index.scss';

window.jQuery = $;
window.$ = $;


ReactDOM.render(<HomePage />, document.getElementById('app'));

