import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SelectCurrentBeer } from '../../../bll/selectors/selectors';
import { fetchBeer } from '../../../bll/slices/beers';
import { useAppDispatch } from '../../../bll/store';
import Preloader from '../../components/preloader/Preloader';

import s from './Beer.module.scss';

const Beer = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentBeer = useSelector(SelectCurrentBeer);
  useEffect(() => {
    id && dispatch(fetchBeer(+id));
  }, []);

  return (
    <div className={s.beerWrapper}>
      {currentBeer.map(({ id: ID, name }) => (
        <div key={ID}>{name}</div>
      ))}
      <Preloader />
    </div>
  );
};

export default Beer;
