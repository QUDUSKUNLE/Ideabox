import React from 'react';
import PropTypes from 'prop-types';
import UpdateProfileForm from '../../home/UpdateProfileForm';

/**
 * @function UpdateProfileModal
 * @description the UpdateProfileModal component.
 * @returns {string} The HTML markup for the UpdateProfileModal component
 */
const UpdateProfileModal = ({ userDetails }) =>
  (
    <div id="update_profile" className="modal">
      <UpdateProfileForm
        userDetails={userDetails}
      />
    </div>
  );

UpdateProfileModal.propTypes = {
  userDetails: PropTypes.object.isRequired
};
export default UpdateProfileModal;
