import React from 'react';
import PropTypes from 'prop-types';
import CreateIdeaModal from './idea/CreatIdeaModal';
import Idea from './idea/Idea';
import Pagination from './container/Pagination';
import SideNav from './container/SideNav';
import AppActions from '../actions/AppActions';
import AppConstants from '../contants/AppConstants';
import AppStore from '../store/AppStore';


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
      publicIdeas: []
    };
    // this.handleCreateIdea = this.handleCreateIdea.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handlePublicIdeas = this.handlePublicIdeas.bind(this);
  }

  /**
  * @method componentDidMount
  * @description This listening to event in the AppStore
  * @return {void}
  * @memberof DashBoard
  */
  componentDidMount() {
    AppActions.getPublicIdeas();
    AppStore.on(AppConstants.PUBLIC_IDEAS, this.handlePublicIdeas);
  }

  /**
  * @method componentWillUnmount
  * @description Removes listener from AppStore
  * @return {void}
  * @memberof DashBoard
  */
  componentWillUnmount() {
    AppStore.removeListener(AppConstants.PUBLIC_IDEAS, this.handlePublicIdeas);
  }

  /**
   * @method handleResponse
   * @description class method that handles register Response
   * @return {void}
   */
  handlePublicIdeas() {
    this.setState({
      publicIdeas: AppStore.publicIdea()
    });
  }

  /**
   * @method handleResponse
   * @description class method that handles register Response
   * @return {void}
   */
  handleLogOut() {
    localStorage.clear();
    this.props.history.push('/');
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {object} SideNav component
  */
  render() {
    return (
      <div>
        <SideNav logOut={this.handleLogOut} />
        <main>
          <CreateIdeaModal />
          <div>
            <Idea publicIdea={this.state.publicIdeas} />

            <Pagination />
          </div>
        </main>
      </div>
    );
  }
}
DashBoard.propTypes = {
  history: PropTypes.object.isRequired
};
