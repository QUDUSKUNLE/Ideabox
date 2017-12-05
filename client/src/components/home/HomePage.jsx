import React from 'react';
import RegisterModal from './RegisterModal';

const HomePage = () => (
  <div>
    <RegisterModal />
    <div className="container">
      <div className="logo">
        <h4>IdeaBox</h4>
      </div>
      <div className="col s12 flex-center">
        <div className="center-align">
          <h3>Let Your Ideas Rule The World</h3>
          <div className="container">
            <button
              data-target="register"
              className="btn modal-trigger waves-effect deep-purple darken-4 margin-top s6"
              type="submit"
              name="action"
            >Register
            </button>
            <button
              className="btn modal-trigger waves-effect deep-purple darken-4 margin-top s6"
              type="submit"
              name="action"
            >LOG IN
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default HomePage;
