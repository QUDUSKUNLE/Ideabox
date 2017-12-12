import React from 'react';
import PropTypes from 'prop-types';

const UserIdeas = props =>
  (
    <div className="idea">
      <div className="row">
        { props.myIdeas.map(idea =>
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
                    {idea.description}
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
              </div>
              <div className="card-action">
                <span className="black-text">{idea.category[0]}</span>
                <i
                  href="#edit_idea"
                  onClick={() => props.handleEdit(idea._id)}
                  role="button"
                  tabIndex="0"
                  className="material-icons black-text delete_tag modal-trigger"
                >
                  edit
                </i>
                <i
                  onClick={() => props.handleDelete(idea._id)}
                  role="button"
                  tabIndex="0"
                  className="material-icons black-text right removable"
                >
                  delete
                </i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


UserIdeas.propTypes = {
  myIdeas: PropTypes.array.isRequired
};
export default UserIdeas;

