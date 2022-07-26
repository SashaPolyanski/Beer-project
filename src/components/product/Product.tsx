import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { selectAllBeer, selectCurrentBeer } from '../../store/selectors/selectors';
import { fetchBeer, setCurrentBeer } from '../../store/slices/beers';
import { useAppDispatch } from '../../store/store';
import Button from '../button/Button';

import SM from './Product.module.scss';

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentBeer = useSelector(selectCurrentBeer);
  const allBeer = useSelector(selectAllBeer);
  useEffect(() => {
    if (id) {
      allBeer.find(f => f.id === +id)
        ? dispatch(setCurrentBeer({ id: +id }))
        : dispatch(fetchBeer(+id));
    }
  }, [id]);
  const previousHandler = () => {
    navigate(-1);
  };
  return (
    <div className={SM.beerWrapper}>
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
          <div className={SM.wrapper} key={ID}>
            <div className={SM.wrapperContent}>
              <div className={SM.imageWrapper}>
                <img className={SM.image} src={image} alt="#" />
                <Button name="previous" previousHandler={previousHandler} />
              </div>
              <div className={SM.contentWrapper}>
                <div className={SM.descriptionWrapper}>
                  <div className={SM.name}>
                    {name} <span className={SM.abv}>{abv}%</span>
                  </div>
                  <div className={SM.tagLine}>{tagline}</div>
                  <div className={SM.description}>{description}</div>
                  <div className={SM.foodPairing}>Food Pairing: {foodPairing}</div>
                </div>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default Product;
