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
        <div>
          {!show.some(id => id === ID) ? (
            <div>
              {description.slice(0, 140)}
              <button type="button" onClick={() => showDescription(ID)}>
                &#8230;
              </button>
            </div>
          ) : (
            <div>
              {description}
              <button type="button" onClick={() => closeDescription(ID)}>
                &#8592; свернуть описание
              </button>
            </div>
          )}
        </div>
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
