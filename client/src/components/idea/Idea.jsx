import React from 'react';
import PropTypes from 'prop-types';

const Idea = ({ publicIdea }) =>
  (
    <div className="idea">
      <div className="row">
        {publicIdea.map(idea =>
          (
            <div className="col s12 m6" key={idea._id}>
              <div className="card">
                <div className="card-content">
                  <span
                    className="card-title activator grey-text text-darken-4"
                  >{idea.title}
                    <i className="material-icons right">more_vert
                    </i>
                  </span>
                  <p>
                    <a href="#">
                      {`${idea.description.slice(0, 20)} ....`}
                    </a>
                  </p>
                </div>
                <div className="card-reveal black-text">
                  <span
                    className="card-title black-text"
                  >{idea.title}
                    <i className="material-icons right">close
                    </i>
                  </span>
                  <p>{idea.description}.</p>
                  <p>Author:{' '}
                    <span className="deep-purple-text">
                      {idea.author.name}
                    </span>
                  </p>
                </div>
                <div className="card-action">
                  <span className="black-text">{idea.category[0]}</span>
                  <i
                    href="#edit_idea"
                    role="button"
                    tabIndex="0"
                    className="material-icons black-text delete_tag edit modal-trigger"
                  >
                  more
                  </i>
                  <i
                    role="button"
                    tabIndex="0"
                    className="material-icons black-text removable"
                  >
                    share
                  </i>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

Idea.propTypes = {
  publicIdea: PropTypes.array.isRequired
};

export default Idea;
