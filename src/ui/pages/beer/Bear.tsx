import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setAllBeers, setCurrentBeer } from '../../../bll/slices/beer';
import { RootState } from '../../../bll/store';
import { api } from '../../../dal/api';

const Bear = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentBeer = useSelector((state: RootState) => state.beer.beer);
  useEffect(() => {
    if (id) {
      const setCurrentBeerHandler = async () => {
        const res: any = await api.getCurrentBeer(+id);
        dispatch(setCurrentBeer({ beer: res.data }));
      };
      setCurrentBeerHandler();
    }
  }, []);

  return (
    <div>
      {currentBeer.map(m => (
        <div key={m.id}>{m.name}</div>
      ))}
    </div>
  );
};

export default Bear;
