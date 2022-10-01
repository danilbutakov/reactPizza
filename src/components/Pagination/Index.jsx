import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';
// import AppContext from '../../context';

const Pagination = ({ onChangePage, currentPage }) => {

    // const { onChangePage } = React.useContext(AppContext);

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            forcePage={currentPage - 1}
            pageCount={3} 
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination;