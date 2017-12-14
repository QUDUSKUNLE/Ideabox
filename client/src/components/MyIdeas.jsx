import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import AppActions from '../actions/AppActions';
import AppConstants from '../contants/AppConstants';
import AppStore from '../store/AppStore';
import EditIdeaModal from './container/modal/EditIdeaModal';
import UserIdeasSideNav from './container/UserIdeasSideNav';
import UserIdeas from './container/UserIdeas';
import Pagination from './container/Pagination';

/**
 * @description - renders MyIdeas Component
 * @class MyIdeas
 * @extends {React.Component}
 */
export default class MyIdeas extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof MyIdeas
   */
  constructor(props) {
    super(props);
    this.state = {
      username: JSON.parse(localStorage.getItem('username')),
      myIdeas: [],
      ideaLimit: 6,
      pageInfo: {},
      selectedIdea: []
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleDeleteResponse = this.handleDeleteResponse.bind(this);
    this.handleMyIdeasResponse = this.handleMyIdeasResponse.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
  * @method componentDidMount
  * @description This listening to event in the AppStore
  * @return {void}
  * @memberof MyIdeas
  */
  componentDidMount() {
    AppActions.myIdeas(this.state.ideaLimit);
    AppStore.on(AppConstants.MY_IDEAS, this.handleMyIdeasResponse);
    AppStore.on(AppConstants.UPDATE_IDEA, this.handleEditIdeaResponse);
    AppStore.on(AppConstants.DELETE_IDEA, this.handleDeleteResponse);
    $('.tooltipped').tooltip({ delay: 50 });
    $('.collapsible').collapsible();
    $('.button-collapse').sideNav({
      closeOnClick: false,
      draggable: true
    });
    $('.modal').modal();
  }

  /**
  * @method componentWillUnmount
  * @description Removes listener from AppStore
  * @return {void}
  * @memberof MyIdeas
  */
  componentWillUnmount() {
    AppStore.removeListener(AppConstants.MY_IDEAS, this.handleMyIdeasResponse);
    AppStore.removeListener(
      AppConstants.UPDATE_IDEA,
      this.handleEditIdeaResponse
    );
    AppStore.removeListener(
      AppConstants.DELETE_IDEA,
      this.handleDeleteResponse
    );
  }

  /**
   * @method handleResponse
   * @description class method that handles myIdeas Response
   * @return {void}
   */
  handleMyIdeasResponse() {
    this.setState({
      myIdeas: AppStore.myIdea().ideas,
      pageInfo: AppStore.myIdea().pageInfo
    });
  }

  /**
   * @method handleResponse
   * @description class method that handles edit idea Response
   * @return {void}
   */
  handleEditIdeaResponse() {
    Materialize.toast(AppStore.updateIdea().message, 2000, 'rounded green');
    $('#edit_idea').modal('close');
  }

  /**
   * @method handleDelete
   * @description class method that handles delete idea Response
   * @param {string} ideaId - Identity of the idea to be deleted
   * @return {void}
   */
  handleDelete(ideaId) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert the idea",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32228F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        AppActions.deleteIdea(ideaId).catch((error) => {
          if (error.response) { return true; }
        });
        swal(
          'Deleted!',
          'Idea deleted successfully.',
          'success'
        );
      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Your idea is intact :)',
          'error'
        );
      }
    });
  }

  /**
   * @method handleEdit
   * @description class method that handles edit idea
   * @param {string} ideaId - Identity of the idea to be edited
   * @return {void}
   */
  handleEdit(ideaId) {
    this.setState({
      selectedIdea: this.state.myIdeas.filter(idea => idea._id === ideaId)
    });
  }

  /**
   * @method  handlePageClick
   * @description class method that handles idea page
   * @param {string} ideaPages
   * @return {void}
   */
  handlePageClick(ideaPages) {
    const { selected } = ideaPages;
    const offset = Math.ceil(selected * this.state.ideaLimit);
    AppActions.myIdeas(this.state.ideaLimit, offset);
  }

  /**
   * @method  handleDeleteResponse
   * @description class method that handles idea page
   * @return {void}
   */
  handleDeleteResponse() {
    AppActions.myIdeas(this.state.ideaLimit);
  }

  /**
   * @method handleLogOut
   * @description class method that handles log out event
   * @return {void}
   */
  handleLogOut() {
    localStorage.clear();
    this.props.history.push('/');
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {object} MyIdeas component
  */
  render() {
    return (
      <div>
        <UserIdeasSideNav
          username={this.state.username}
          handleLogOut={this.handleLogOut}
        />
        <main>
          <EditIdeaModal
            selectedIdea={this.state.selectedIdea}
          />
          <div>
            <UserIdeas
              myIdeas={this.state.myIdeas}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
            <Pagination
              pageInfo={this.state.pageInfo}
              clickHandler={this.handlePageClick}
            />
          </div>
        </main>
      </div>
    );
  }
}
MyIdeas.propTypes = {
  history: PropTypes.object.isRequired
};

