import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  selectCurrentPage,
  selectPerPage,
  selectTotalCount,
} from '../../store/selectors/selectors';
import { setCurrentPage } from '../../store/slices/beers';
import { createPages } from '../../utils/createPages';
import Button from '../button/Button';

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
