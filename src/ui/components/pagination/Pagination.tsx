import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  selectCurrentPage,
  selectPerPage,
  selectTotalCount,
} from '../../../bll/selectors/selectors';
import { setCurrentPage } from '../../../bll/slices/beers';
import { createPages } from '../../../common/utils/createPages/createPages';

import SM from './Pagination.module.scss';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const perPage = useSelector(selectPerPage);
  const totalCount = useSelector(selectTotalCount);
  const pagesCount = Math.ceil(totalCount / perPage);
  const changeCurrentPage = (page: number) => {
    dispatch(setCurrentPage({ page }));
  };

  const pages: number[] = [];
  createPages(pages, pagesCount, currentPage);
  console.log(totalCount);

  return (
    <div>
      {pages.map((page, index) => (
        <button
          type="button"
          key={index.toString() + page}
          onClick={() => changeCurrentPage(page)}
          className={
            currentPage === page ? `${SM.buttonPage} ${SM.active}` : SM.buttonPage
          }
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
