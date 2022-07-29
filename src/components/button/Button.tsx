import React from 'react';

import SM from './Button.module.scss';

const Button = ({ name, previousHandler, currentPage, page }: ButtonType) => {
  const finalClassName =
    currentPage === page ? `${SM.buttonPage} ${SM.active}` : SM.buttonPage;

  return (
    <button type="button" onClick={previousHandler} className={finalClassName}>
      {name}
    </button>
  );
};
type ButtonType = {
  name: string | number;
  previousHandler?: () => void;
  currentPage?: number;
  page?: number;
};
export default Button;
