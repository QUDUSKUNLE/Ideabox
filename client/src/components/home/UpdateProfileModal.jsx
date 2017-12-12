import React from 'react';
import PropTypes from 'prop-types';
import UpdateProfileForm from './UpdateProfileForm';

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
