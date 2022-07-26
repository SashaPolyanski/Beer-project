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
      {currentBeer.map(
        ({
          id: ID,
          name,
          image_url: image,
          description,
          food_pairing: foodPairing,
          abv,
          tagline,
        }) => (
          <div className={s.wrapper} key={ID}>
            <div className={s.wrapperContent}>
              <div className={s.imageWrapper}>
                <img className={s.image} src={image} alt="#" />
              </div>
              <div className={s.contentWrapper}>
                <div className={s.descriptionWrapper}>
                  <div className={s.name}>
                    {name} <span className={s.abv}>{abv}%</span>
                  </div>
                  <div className={s.tagLine}>{tagline}</div>
                  <div className={s.description}>{description}</div>
                  <div className={s.foodPairing}>Food Pairing: {foodPairing}</div>
                </div>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default Beer;
