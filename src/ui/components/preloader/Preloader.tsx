import React from 'react';

import preloader from '../../../assets/images/preloader.gif';

import s from './Preloader.module.scss';

const Preloader = () => (
  <div>
    <img className={s.preloader} src={preloader} alt="#" />
  </div>
);

export default Preloader;
