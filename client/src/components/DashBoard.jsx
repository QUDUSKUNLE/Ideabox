import React from 'react';
import PropTypes from 'prop-types';
import AppActions from '../actions/AppActions';
import AppConstants from '../contants/AppConstants';
import AppStore from '../store/AppStore';
import CreateIdeaModal from './container/modal/CreatIdeaModal';
import Idea from './container/idea/Idea';
import Pagination from './container/Pagination';
import SideNav from './container/SideNav';


/**
 * @description the Dashboard component
 * @function Dashboard
 * @returns {object} DashBoard component
 */
export default class DashBoard extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof DashBoard
   */
  constructor(props) {
    super(props);
    this.state = {
      publicIdeas: [],
      ideaLimit: 6,
      pageInfo: {},
      category: '',
      categoryIsClicked: false
    };
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handlePublicIdeas = this.handlePublicIdeas.bind(this);
    this.handleCategoryResponse = this.handleCategoryResponse.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handlePublicRevert = this.handlePublicRevert.bind(this);
    this.handleClickCategory = this.handleClickCategory.bind(this);
    this.handleSearchResponse = this.handleSearchResponse.bind(this);
  }

  /**
  * @method componentDidMount
  * @description This listening to event in the AppStore
  * @return {void}
  * @memberof DashBoard
  */
  componentDidMount() {
    $('.collapsible').collapsible();
    $('.button-collapse').sideNav({
      menuWidth: 300,
      closeOnClick: false,
      draggable: true
    });
    $('.tooltipped').tooltip({ delay: 50 });
    AppActions.getPublicIdeas(this.state.ideaLimit);
    AppStore.on(AppConstants.PUBLIC_IDEAS, this.handlePublicIdeas);
    AppStore.on(AppConstants.CREATE_IDEA, this.handlePublicIdeas);
    AppStore.on(AppConstants.CATEGORY, this.handleCategoryResponse);
    AppStore.on(AppConstants.SEARCH_IDEA, this.handleSearchResponse);
  }

  /**
  * @method componentWillUnmount
  * @description Removes listener from AppStore
  * @return {void}
  * @memberof DashBoard
  */
  componentWillUnmount() {
    AppStore.removeListener(AppConstants.PUBLIC_IDEAS, this.handlePublicIdeas);
    AppStore.removeListener(AppConstants.CREATE_IDEA, this.handlePublicIdeas);
    AppStore.removeListener(AppConstants.CATEGORY, this.handleCategoryResponse);
    AppStore.removeListener(
      AppConstants.SEARCH_IDEA,
      this.handleSearchResponse
    );
  }

  /**
   * @method handlePublicIdeas
   * @description class method that handles public Ideas response
   * @return {void}
   */
  handlePublicIdeas() {
    this.setState({
      publicIdeas: AppStore.publicIdea().ideas,
      pageInfo: AppStore.publicIdea().pageInfo
    });
  }

  /**
   * @method  handlePageClick
   * @description class method that listen to pagination click
   * @param {string} ideaPages
   * @return {void}
   */
  handlePageClick(ideaPages) {
    const { selected } = ideaPages;
    const offset = Math.ceil(selected * this.state.ideaLimit);
    if (this.state.categoryIsClicked === true) {
      AppActions
        .fetchByCategory(
          this.state.category,
          this.state.ideaLimit,
          offset
        );
    } else {
      AppActions.getPublicIdeas(this.state.ideaLimit, offset);
    }
  }

  /**
   * @method handlePublicRevert
   * @description class method that handles public Revert response
   * @return {void}
   */
  handlePublicRevert() {
    this.setState({ categoryIsClicked: false });
    AppActions.getPublicIdeas(this.state.ideaLimit);
  }

  /**
   * @method handleResponse
   * @description class method that handles log out action
   * @return {void}
   */
  handleLogOut() {
    localStorage.clear();
    this.props.history.push('/');
  }

  /**
   * @method handleClickCategory
   * @description Listen to filter by Category in the SideNav
   * @param {string} clickCategory click category
   * @return {void}
   */
  handleClickCategory(clickCategory) {
    this.setState({
      category: clickCategory,
      categoryIsClicked: true
    });
    AppActions.fetchByCategory(
      clickCategory,
      this.state.ideaLimit
    );
  }

  /**
   * @method handleCategoryResponse
   * @description class method that handles Filter by Category Response
   * @return {void}
   */
  handleCategoryResponse() {
    this.setState({
      publicIdeas: AppStore.categoryIdea().ideas,
      pageInfo: AppStore.categoryIdea().pageInfo
    });
  }

  /**
   * @method handleSearchResponse
   * @description class method that handles Search Response
   * @return {void}
   */
  handleSearchResponse() {
    this.setState({
      publicIdeas: AppStore.searchIdea().ideas,
      pageInfo: AppStore.searchIdea().pageInfo
    });
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {object} DashBoard component
  */
  render() {
    return (
      <div>
        <SideNav
          handleClickCategory={this.handleClickCategory}
          ideaLimit={this.state.ideaLimit}
          handlePublicRevert={this.handlePublicRevert}
          logOut={this.handleLogOut}
        />
        <main>
          <CreateIdeaModal />
          <div>
            <Idea
              publicIdea={this.state.publicIdeas}
            />
            {this.state.publicIdeas.length > 0 && <Pagination
              pageInfo={this.state.pageInfo}
              clickHandler={this.handlePageClick}
            />}
          </div>
        </main>
      </div>
    );
  }
}

DashBoard.propTypes = {
  history: PropTypes.object.isRequired
};
