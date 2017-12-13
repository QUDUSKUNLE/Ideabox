import React from 'react';
import PropTypes from 'prop-types';
import EditIdea from '../idea/EditIdea';

/**
 * @function EditIdeaModal
 * @description the EditIdeaModal component.
 * @returns {string} The HTML markup for the EditIdeaModal component
 */
const EditIdeaModal = ({ selectedIdea }) =>
  (
    <div id="edit_idea" className="modal">
      <EditIdea
        selectedIdea={selectedIdea}
      />
    </div>
  );

EditIdeaModal.propTypes = {
  selectedIdea: PropTypes.array.isRequired
};
export default EditIdeaModal;
