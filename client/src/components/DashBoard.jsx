import React from 'react';
// import CreateIdea from '../components/idea/CreateIdea';
import Idea from './idea/Idea';
import Pagination from './container/Pagination';
import SideNav from './container/SideNav';

/**
 * @description the Dashboard component
 * @function Dashboard
 * @returns {object} DashBoard component
 */
export default () => (
  <div>
    { /* SideNav */ }
    <SideNav />
    <main>
      { /* Idea */ }
      <Idea />
      {/* <CreateIdea /> */}
      {/* Pagiantion */}
      <Pagination />
    </main>
  </div>
);
