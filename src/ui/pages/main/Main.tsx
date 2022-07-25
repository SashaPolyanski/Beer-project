import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { setAllBeers } from '../../../bll/slices/beer';
import { RootState } from '../../../bll/store';
import { api } from '../../../dal/api';
// @ts-ignore
import arrowImage from '../../../features/images/arrowSing.png';
// @ts-ignore
import spreadImage from '../../../features/images/spreadSign.png';
import Pagination from '../../components/pagination/Pagination';
import { useDebounce } from '../../utilsFunc/useDebounceHOOK/useDebounce';
import Header from '../header/Header';
import './Main.scss';

const Main = () => {
  const [searchValue, setSearchValue] = useState('');
  const [show, setShow] = useState<number[]>([]);
  const allBeer = useSelector((state: RootState) => state.beer.beers);
  const perPage = useSelector((state: RootState) => state.beer.perPage);
  const currentPage = useSelector((state: RootState) => state.beer.currentPage);
  const dispatch = useDispatch();
  useEffect(() => {
    const getBeers = async () => {
      const res: any = await api.getBeers(currentPage, perPage);
      dispatch(setAllBeers({ beers: res.data }));
    };
    getBeers();
  }, [currentPage]);
  const showDescription = (id: number) => {
    setShow([...show, id]);
  };
  const closeDescription = (id: number) => {
    setShow(show.filter(f => f !== id));
  };
  const delayed = useDebounce(searchValue, 1000);
  return (
    <div>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      {allBeer
        .filter(beer => beer.name.toLowerCase().includes(delayed.toLowerCase()))
        .map(m => (
          <div key={m.id}>
            <NavLink to={`beer/${m.id}`}>
              {m.name} <img src={m.image_url} alt="#" />
            </NavLink>
            <div>
              {m.description.length >= 140 ? (
                <div>
                  {!show.some(id => id === m.id) ? (
                    <span>
                      {m.description.slice(0, 140)}{' '}
                      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                      <img
                        onClick={() => showDescription(m.id)}
                        src={spreadImage}
                        alt="#"
                      />{' '}
                    </span>
                  ) : (
                    <span>
                      {m.description}{' '}
                      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                      <img
                        onClick={() => closeDescription(m.id)}
                        src={arrowImage}
                        alt="#"
                      />
                    </span>
                  )}
                </div>
              ) : (
                m.description
              )}
            </div>
          </div>
        ))}
      <Pagination />
    </div>
  );
};
export default Main;
