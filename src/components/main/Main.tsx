import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { ConstantsNumber } from '../../common/constants/constants';
import {
  selectAllBeer,
  selectCurrentPage,
  selectIsLoading,
  selectPerPage,
} from '../../store/selectors/selectors';
import { fetchBeers } from '../../store/slices/beers';
import { useAppDispatch } from '../../store/store';
import { useDebounce } from '../../utils/useDebounce';
import ProductBlock from '../beersBlock/ProductBlock';
import Header from '../header/Header';
import Pagination from '../pagination/Pagination';
import Preloader from '../preloader/Preloader';

import SM from './Main.module.scss';

const Main = () => {
  const [searchValue, setSearchValue] = useState('');
  const [touched, setTouched] = useState(false);
  const allBeer = useSelector(selectAllBeer);
  const perPage = useSelector(selectPerPage);
  const currentPage = useSelector(selectCurrentPage);
  const loading = useSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const delayed = useDebounce(searchValue, ConstantsNumber.DELAY);
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
  const allBears = allBeer.map(item => <ProductBlock key={item.id} {...item} />);
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
