import React from 'react';

import { Link } from 'react-router-dom';

import { ResponseType } from '../../../dal/api';
import SM from '../../pages/main/Main.module.scss';
import DescriptionBeer from '../descriptionBeer/DescriptionBeer';

const BeersBlock = ({ id: ID, description, name, image_url: image }: ResponseType) => (
  <div className={SM.wrapper} key={ID}>
    <div className={SM.imageWrapper}>
      <Link to={`beer/${ID}`}>
        <img className={SM.img} src={image} alt="#" />
        <div className={SM.name}>{name}</div>
      </Link>
    </div>
    <div className={SM.description}>
      <DescriptionBeer description={description} ID={ID} />
    </div>
  </div>
);

export default BeersBlock;
