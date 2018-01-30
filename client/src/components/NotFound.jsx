import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @function NotFound
 * @description the NotFound component
 * @returns {string} The HTML markup for the NotFound component
 */
const NotFound = () =>
  (
    <div className="container">
      <div className="logo">
        <h4>IdeaBox</h4>
      </div>
      <div className="col s12 flex-center">
        <div className="center-align">
          <div className="center-align centralize">
            <h3 className="white-text">
              You`re lost.<Link to="/">Home</Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );

export default NotFound;
