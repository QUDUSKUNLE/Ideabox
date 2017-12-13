import React from 'react';
import CreateIdea from '../idea/CreateIdea';

/**
 * @function CreateIdeaModal
 * @description the CreateIdeaModal component.
 * @returns {string} The HTML markup for the CreateIdeaModal component
 */
export default () => (
  <div id="create_idea" className="modal">
    <CreateIdea />
  </div>
);
