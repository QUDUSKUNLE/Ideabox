import React from 'react';

export default {

  errorMessage(error) {
    return (
      <div className="red accent-4 center-align display">
        <span>{error}</span>
      </div>);
  },

  successMessage(message) {
    return (
      <div
        className="green darken-3 center-align display"
      >
        <span>{message}</span>
      </div>
    );
  }
};

