import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function UserIdeas
 * @description the UserIdeas component.
 * @param {object} props
 * @returns {string} The HTML markup for the UserIdeas component
 */
export default class UserIdeas extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof UserIdeas
   */
  constructor(props) {
    super(props);
    this.state = {
      myIdeas: []
    };
  }

  /**
  * @method componentWillReceiveProps
  * @description This listening if props changes
  * @param {object} nextProps
  * @return {void}
  * @memberof MainIdea
  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.myIdeas[0] !== undefined) {
      this.setState({
        myIdeas: nextProps.myIdeas
      });
    }
  }


  /**
  * @description - render method, React lifecycle method
  * @returns {object} UserIdeas component
  */
  render() {
    return (
      <div className="idea">
        <div className="row">
          { this.state.myIdeas.map(idea =>
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
                  <span
                    className="black-text category"
                  >{idea.category[0]}
                  </span>
                  <i
                    href="#edit_idea"
                    onClick={() => this.props.handleEdit(idea._id)}
                    role="button"
                    tabIndex="0"
                    className="material-icons black-text delete_tag modal-trigger tooltipped"
                    data-position="top"
                    data-delay="50"
                    data-tooltip="edit"
                  >
                    edit
                  </i>
                  <i
                    onClick={() => this.props.handleDelete(idea._id)}
                    role="button"
                    tabIndex="0"
                    className="material-icons black-text right removable tooltipped"
                    data-position="top"
                    data-delay="50"
                    data-tooltip="delete"
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
  }
}

UserIdeas.propTypes = {
  myIdeas: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

