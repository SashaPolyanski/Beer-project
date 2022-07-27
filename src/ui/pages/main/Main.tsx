import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import {
  SelectAllBeer,
  SelectCurrentPage,
  SelectIsLoading,
  SelectPerPage,
} from '../../../bll/selectors/selectors';
import { fetchBeers, fetchFilterBeers } from '../../../bll/slices/beers';
import { useAppDispatch } from '../../../bll/store';
import BeersBlock from '../../components/BeersBlock/BeersBlock';
import Pagination from '../../components/pagination/Pagination';
import Preloader from '../../components/preloader/Preloader';
import { useDebounce } from '../../utilsFunc/useDebounceHOOK/useDebounce';
import Header from '../header/Header';

import SM from './Main.module.scss';

const Main = () => {
  const [searchValue, setSearchValue] = useState('');
  const allBeer = useSelector(SelectAllBeer);
  const perPage = useSelector(SelectPerPage);
  const currentPage = useSelector(SelectCurrentPage);
  const loading = useSelector(SelectIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBeers({ currentPage, perPage }));
  }, [currentPage]);
  useEffect(() => {
    dispatch(fetchFilterBeers({ beerName: searchValue, perPage }));
  }, [searchValue]);

  const delayed = useDebounce(searchValue, 1000);
  if (loading) return <Preloader />;
  return (
    <>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className={SM.mainWrapper}>
        {allBeer.map(item => (
          <BeersBlock key={item.id} {...item} />
        ))}
      </div>
      <div className={SM.pagination}>
        <Pagination />
      </div>
    </>
  );
};
export default Main;
