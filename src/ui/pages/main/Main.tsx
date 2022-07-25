import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  SelectAllBeer,
  SelectCurrentPage,
  SelectIsLoading,
  SelectPerPage,
} from '../../../bll/selectors/selectors';
import { fetchBeers } from '../../../bll/slices/beers';
import { useAppDispatch } from '../../../bll/store';
import Pagination from '../../components/pagination/Pagination';
import Preloader from '../../components/preloader/Preloader';
import { useDebounce } from '../../utilsFunc/useDebounceHOOK/useDebounce';
import Header from '../header/Header';

const Main = () => {
  const [searchValue, setSearchValue] = useState('');
  const [show, setShow] = useState<number[]>([]);
  const allBeer = useSelector(SelectAllBeer);
  const perPage = useSelector(SelectPerPage);
  const currentPage = useSelector(SelectCurrentPage);
  const loading = useSelector(SelectIsLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBeers({ currentPage, perPage }));
  }, [currentPage]);

  const showDescription = (id: number) => {
    setShow([...show, id]);
  };

  const closeDescription = (id: number) => {
    setShow(show.filter(f => f !== id));
  };

  const delayed = useDebounce(searchValue, 1000);
  if (loading) return <Preloader />;
  return (
    <div>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      {allBeer
        .filter(beer => beer.name.toLowerCase().includes(delayed.toLowerCase()))
        .map(({ id: ID, description, name, image_url: image }) => (
          <div key={ID}>
            <Link to={`beer/${ID}`}>
              {name} <img src={image} alt="#" />
            </Link>
            <div>
              {description.length >= 140 ? (
                <div>
                  {!show.some(id => id === ID) ? (
                    <span>
                      {description.slice(0, 140)}{' '}
                      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                      <span onClick={() => showDescription(ID)}> &#8230;</span>
                    </span>
                  ) : (
                    <span>
                      {description} {/* вынести в отдельную компоненту */}
                      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                      <span onClick={() => closeDescription(ID)}>
                        &#8592; свернуть описание
                      </span>
                    </span>
                  )}
                </div>
              ) : (
                description
              )}
            </div>
          </div>
        ))}
      <Pagination />
    </div>
  );
};
export default Main;
