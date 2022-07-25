import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Bear from './ui/pages/beer/Bear';
import Main from './ui/pages/main/Main';

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="beer/:id" element={<Bear />} />
    </Routes>
  </div>
);

export default App;
