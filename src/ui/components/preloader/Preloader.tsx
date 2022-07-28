import React from 'react';

import preloader from '../../../assets/images/preloader.gif';

import SM from './Preloader.module.scss';

const Preloader = () => (
  <div className={SM.preloaderWrapper}>
    <img className={SM.preloader} src={preloader} alt="#" />
  </div>
);

export default Preloader;
