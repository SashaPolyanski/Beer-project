import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { ResponseType } from '../../../dal/api';
import SM from '../../pages/main/Main.module.scss';

const BeersBlock = ({ id: ID, description, name, image_url: image }: ResponseType) => {
  const [show, setShow] = useState<number[]>([]);

  const showDescription = (id: number) => {
    setShow([...show, id]);
  };

  const closeDescription = (id: number) => {
    setShow(show.filter(f => f !== id));
  };
  return (
    <div className={SM.wrapper} key={ID}>
      <div className={SM.name}>
        <div className={SM.imageWrapper}>
          <Link to={`beer/${ID}`}>
            <img className={SM.img} src={image} alt="#" />
            <div>{name}</div>
          </Link>

          <div className={SM.description}>
            {description.length >= 140 ? (
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <div>
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
                    <div onClick={() => closeDescription(ID)}>
                      &#8592; свернуть описание
                    </div>
                  </div>
                )}
              </div>
            ) : (
              description
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeersBlock;
