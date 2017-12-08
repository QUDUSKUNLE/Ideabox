import React from 'react';
import CreateIdeaModal from './idea/CreatIdeaModal';
import Idea from './idea/Idea';
import Pagination from './container/Pagination';
import SideNav from './container/SideNav';

/**
 * @description the Dashboard component
 * @function Dashboard
 * @returns {object} DashBoard component
 */
export default class Dashboard extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof DashBoard
   */
  constructor(props) {
    super(props);
    this.state = { createIdea: false };
    this.handleCreateIdea = this.handleCreateIdea.bind(this);
  }

  /**
  * @method handleCreateIdea
  * @description class method that listen to
  * OnClick of createIdea in the SideNav component
  * @return {void}
  * @param {event} event
  */
  handleCreateIdea() {
    this.setState({
      createIdea: !this.state.createIdea
    });
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {object} SideNav component
  */
  render() {
    return (
      <div>
        { /* SideNav */}
        <SideNav />
        <main>
          <CreateIdeaModal />
          <div>
            { /* Idea */}
            <Idea />
            {/* Pagiantion */}
            <Pagination />
          </div>
        </main>
      </div>
    );
  }
}
