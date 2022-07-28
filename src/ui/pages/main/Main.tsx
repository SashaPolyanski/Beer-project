import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import {
  selectAllBeer,
  selectCurrentPage,
  selectIsLoading,
  selectPerPage,
} from '../../../bll/selectors/selectors';
import { fetchBeers } from '../../../bll/slices/beers';
import { useAppDispatch } from '../../../bll/store';
import { NumberConstants } from '../../../common/constants/constants';
import { useDebounce } from '../../../common/utils/useDebounceHOOK/useDebounce';
import BeersBlock from '../../components/beersBlock/BeersBlock';
import Pagination from '../../components/pagination/Pagination';
import Preloader from '../../components/preloader/Preloader';
import Header from '../header/Header';

import SM from './Main.module.scss';

const Main = () => {
  const [searchValue, setSearchValue] = useState('');
  const [touched, setTouched] = useState(false);
  const allBeer = useSelector(selectAllBeer);
  const perPage = useSelector(selectPerPage);
  const currentPage = useSelector(selectCurrentPage);
  const loading = useSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const delayed = useDebounce(searchValue, NumberConstants.DELAY);
  // Ниже представлен костыль, с помощью которого мы можем сделать
  // более-менее юзабельную пагинацию и уменьшить количество запросов.
  // Данная апишка не располагает данными по общему количеству объектов.
  // Так же общее количесво невозможно узнать, путем получения всего массива,
  // сервер отдает по умолчанию только 25 объектов.
  // Во время поиска сервер может вернуть нам максимум 80 объектов
  // Поэтому пагинация будет ограничена 80 объектами во время поиска

  useEffect(() => {
    if (searchValue) {
      dispatch(
        fetchBeers({
          currentPage,
          perPage,
          beerName: delayed,
          isTotalCountNeedUpdate: false,
        }),
      );
    } else {
      dispatch(fetchBeers({ currentPage, perPage, isTotalCountNeedUpdate: false }));
    }
  }, [currentPage]);
  useEffect(() => {
    if (searchValue) {
      setTouched(true);
      dispatch(
        fetchBeers({
          currentPage,
          perPage,
          beerName: delayed.replace(' ', '_'),
          isTotalCountNeedUpdate: true,
        }),
      );
    }
    if (touched && !!searchValue) {
      dispatch(fetchBeers({ currentPage, perPage, isTotalCountNeedUpdate: false }));
    }
  }, [delayed]);

  if (loading) return <Preloader />;
  const allBears = allBeer.map(item => <BeersBlock key={item.id} {...item} />);
  return (
    <>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className={SM.mainWrapper}>{allBears}</div>
      <div className={SM.pagination}>
        <Pagination />
      </div>
    </>
  );
};
export default Main;
