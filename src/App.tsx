import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { PATH } from './common/constants/constants';
import Main from './components/main/Main';
import Product from './components/product/Product';

const App = () => (
  <Routes>
    <Route path={PATH.MAIN} element={<Main />} />
    <Route path={PATH.PRODUCT} element={<Product />} />
  </Routes>
);

export default App;
