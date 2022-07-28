import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Beer from './ui/pages/beer/Beer';
import Main from './ui/pages/main/Main';

const App = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="beer/:id" element={<Beer />} />
  </Routes>
);

export default App;
