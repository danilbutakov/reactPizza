import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';
// import AppContext from '../../context';

const Pagination = ({ onChangePage }) => {

    // const { onChangePage } = React.useContext(AppContext);

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination;