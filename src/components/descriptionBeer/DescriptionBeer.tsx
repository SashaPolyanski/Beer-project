import React, { useState } from 'react';

import SM from './DescriptionBeer.module.scss';

const DescriptionBeer = ({ description, ID }: DescriptionType) => {
  const [show, setShow] = useState<number[]>([]);

  const showDescription = (id: number) => {
    setShow([...show, id]);
  };

  const closeDescription = (id: number) => {
    setShow(show.filter(f => f !== id));
  };
  return (
    <div className={SM.description}>
      {description.length >= 140 ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {!show.some(id => id === ID) ? (
            <div>
              {description.slice(0, 140)}{' '}
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div onClick={() => showDescription(ID)}> &#8230;</div>
            </div>
          ) : (
            <div>
              {description} {/* вынести в отдельную компоненту */}
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div onClick={() => closeDescription(ID)}>&#8592; свернуть описание</div>
            </div>
          )}
        </>
      ) : (
        description
      )}
    </div>
  );
};

export default DescriptionBeer;

type DescriptionType = {
  description: string;
  ID: number;
};
