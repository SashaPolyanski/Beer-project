import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  selectCurrentPage,
  selectPerPage,
  selectTotalCount,
} from '../../../bll/selectors/selectors';
import { setCurrentPage } from '../../../bll/slices/beers';
import { createPages } from '../../../common/utils/createPages/createPages';
import Button from '../button/Button';

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
        <Button
          key={index.toString() + page}
          previousHandler={() => changeCurrentPage(page)}
          name={page}
          page={page}
          currentPage={currentPage}
        />
      ))}
    </div>
  );
};

export default Pagination;
