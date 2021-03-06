import React from 'react';
import ReactMde, { ReactMdeCommands } from 'react-mde';
import AppActions from '../../../actions/AppActions';
import AppConstants from '../../../contants/AppConstants';
import AppStore from '../../../store/AppStore';

/**
 * @description - renders CreateIdea Component
 * @class CreateIdea
 * @extends {React.Component}
 */
export default class CreateIdea extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof CreateIdea
   */
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      title: '',
      access: '',
      ideaLimit: 6,
      reactMdeValue: { text: '', selection: null }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateIdea = this.handleCreateIdea.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  /**
  * @method componentDidMount
  * @description This listening to event in the AppStore
  * @return {void}
  * @memberof CreateIdea
  */
  componentDidMount() {
    AppStore.on(AppConstants.CREATE_IDEA, this.handleResponse);
    $('.modal').modal();
  }

  /**
  * @method componentWillUnmount
  * @description Removes listener from AppStore
  * @return {void}
  * @memberof CreateIdea
  */
  componentWillUnmount() {
    AppStore.removeListener(AppConstants.CREATE_IDEA, this.handleResponse);
  }

  /**
  * @method handleChange
  * @description class method that binds create idea input to form fields
  * @return {void}
  * @param {event} event
  */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
  * @method handleValueChange
  * @description class method that binds markdown input fields to reactMdeValue
  * @return {void}
  * @param {event} value
  */
  handleValueChange(value) {
    this.setState({ reactMdeValue: value });
  }

  /**
   * @method handleResponse
   * @description class method that handles createIdea
   * @return {void}
   */
  handleResponse() {
    Materialize.toast(AppStore.createIdea().message, 2000, 'rounded green');
    AppActions.getPublicIdeas(this.state.ideaLimit);
    this.setState({
      category: '',
      title: '',
      access: '',
      reactMdeValue: { text: '', selection: null }
    });
    $('#create_idea').modal('close');
  }

  /**
  * @method handleCreateIdea
  * @description class method that makes an action call to sign up a user
  * @return {void}
  * @param {createNewIdea} createNewIdea
  */
  handleCreateIdea(createNewIdea) {
    createNewIdea.preventDefault();
    const newIdea = {
      title: this.state.title,
      description: this.state.reactMdeValue.text,
      category: this.state.category,
      access: this.state.access
    };
    AppActions.createIdea(newIdea)
      .catch((error) => {
        if (error.response) {
          Materialize.toast(error.response.data.error, 2000, 'rounded red');
        }
      });
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {Object} CreateIdea component
  */
  render() {
    return (
      <div className="modal-content">
        <div className="container">
          <h5 className="center-align header create_idea">
            Create Idea
          </h5>
          <div className="row">
            <form
              className="col s12"
              onSubmit={this.handleCreateIdea}
            >
              <div className="input-field black-text col s12">
                <input
                  id="title"
                  name="title"
                  onChange={this.handleChange}
                  type="text"
                  className="validate"
                  data-length="50"
                  required
                />
                <label htmlFor="title">Title</label>
              </div>
              <div className="input-field black-text col s12">
                <div>
                  <ReactMde
                    textAreaProps={{
                      id: 'ta1',
                      name: 'ta1',
                    }}
                    value={this.state.reactMdeValue}
                    onChange={this.handleValueChange}
                    commands={ReactMdeCommands.getDefaultCommands()}
                  />
                </div>
              </div>
              <div className="col s12">
                <label>Category</label>
                <select
                  className="browser-default black-text"
                  name="category"
                  onChange={this.handleChange}
                  value={this.state.category}
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
                    value="Private"
                    onChange={this.handleChange}
                    name="access"
                    type="radio"
                    id="test1"
                  />
                  <label htmlFor="test1">Private</label>
                  <input
                    value="Public"
                    name="access"
                    onChange={this.handleChange}
                    type="radio"
                    id="test2"
                  />
                  <label htmlFor="test2">Public</label>
                  <p className="black-text">Public ideas are visible to everyone
                  </p>
                </div>
              </div>
              <div className="input-field col s12">
                <button
                  className="btn deep-purple darken-4 margin-top s6"
                  type="submit"
                >CREATE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
