import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

const Pagination = props =>
  (
    <div className="pagination center" id="foot">
      <ReactPaginate
        previousLabel="Prev"
        nextLabel="Next"
        breakLabel={<a href="">...</a>}
        breakClassName="break-me"
        pageCount={props.pageInfo.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={props.clickHandler}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </div>
  );

Pagination.propTypes = {
  pageInfo: PropTypes.object.isRequired,
  clickHandler: PropTypes.func.isRequired
};

export default Pagination;
