import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setCurrentPage } from '../../../bll/slices/beer';
import { RootState } from '../../../bll/store';
import { createPages } from '../../utilsFunc/createPages/createPages';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.beer.currentPage);
  const perPage = useSelector((state: RootState) => state.beer.perPage);
  const totalCount = useSelector((state: RootState) => state.beer.totalCount);
  const pagesCount = Math.ceil(totalCount / perPage);

  const pages: number[] = [];
  createPages(pages, pagesCount, currentPage);
  return (
    <div>
      {pages.map((page, index) => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <span
          key={`${index.toString()}1`}
          onClick={() => dispatch(setCurrentPage({ page }))}
        >
          {page}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
