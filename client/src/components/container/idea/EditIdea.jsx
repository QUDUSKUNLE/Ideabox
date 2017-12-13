import React from 'react';
import PropTypes from 'prop-types';
import AppActions from '../../../actions/AppActions';

/**
 * @description the EditIdea component
 * @function EditIdea
 * @returns {object} EditIdea component
 */
export default class EditIdea extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof EditIdea
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      category: '',
      access: '',
      ideaId: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditIdea = this.handleEditIdea.bind(this);
  }


  /**
  * @method componentWillReceiveProps
  * @description This listening to event in the AppStore
  * @param {object} nextProps
  * @return {void}
  * @memberof EditIdea
  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIdea[0] !== undefined) {
      this.setState({
        title: nextProps.selectedIdea[0].title,
        description: nextProps.selectedIdea[0].description,
        category: nextProps.selectedIdea[0].category[0],
        access: nextProps.selectedIdea[0].access[0],
        ideaId: nextProps.selectedIdea[0]._id
      });
    }
  }

  /**
  * @method handleChange
  * @description class method that sets user input to store
  * @return {void}
  * @param {event} event
  */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
  * @method handleEditIdea
  * @description class method handles edit Idea
  * @param {event} event
  * @returns {void}
  */
  handleEditIdea(event) {
    event.preventDefault();
    AppActions.updateIdea(this.state);
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {object} EditIdea component
  */
  render() {
    const editModal = () => {
      if (this.props.selectedIdea[0] === undefined) {
        return (
          <span>
            {' '}
          </span>
        );
      }

      return (
        <div className="modal-content">
          <div className="container">
            <h5 className="center-align header create_idea">
              Edit Idea
            </h5>
            <div className="row">
              <form
                className="col s12"
                onSubmit={this.handleEditIdea}
              >
                <div className="input-field black-text col s12">
                  <i
                    className="material-icons prefix"
                  >subtitles
                  </i>
                  <input
                    id="title"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                    type="text"
                    className="validate"
                    data-length="50"
                    required
                  />
                  <label htmlFor="title">Title</label>
                </div>
                <div className="input-field black-text col s12">
                  <i
                    className="material-icons prefix"
                  >description
                  </i>
                  <textarea
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    id="description"
                    className="materialize-textarea"
                    data-length="500"
                    required
                  />
                  <label htmlFor="description">Description</label>
                </div>
                <div className="col s12">
                  <label>Category</label>
                  <select
                    className="browser-default black-text"
                    name="category"
                    value={this.state.category}
                    onChange={this.handleChange}
                    required
                  >
                    <option value="">Choose your category</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Politics">Politics</option>
                    <option value="Business">Business</option>
                    <option value="Education">Education</option>
                    <option value="Religion">Religion</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
                <div className="row">
                  <div className="status">
                    <input
                      value={this.state.access}
                      onChange={this.handleChange}
                      name="access"
                      type="radio"
                      id="test1"
                    />
                    <label htmlFor="test1">Private</label>
                    <input
                      value={this.props.selectedIdea[0].access[0]}
                      name="access"
                      onChange={this.handleChange}
                      type="radio"
                      id="test2"
                    />
                    <label htmlFor="test2">Public</label>
                    <p className="black-text">
                      Public ideas are visible to everyone
                    </p>
                  </div>
                </div>
                <div className="input-field col s12">
                  <button
                    className="btn deep-purple darken-4 margin-top s6"
                    type="submit"
                  >SAVE CHANGES
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    };
    return (editModal());
  }
}

EditIdea.propTypes = {
  selectedIdea: PropTypes.array.isRequired
};

