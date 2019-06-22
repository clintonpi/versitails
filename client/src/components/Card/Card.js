import React from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';

const Card = ({
  link, color, heading, imgSrc, imgAlt, description
}) => (
  <Link to={`/${link}`} className="card bc-c1 p-10 bx-sh ttn-3 ol-0" style={{ borderTop: `7px solid ${color}` }}>
    <h3 className="main-text txt-al-c">{ heading }</h3>
    <div className="description flex">
      <img src={ `/dist/images/${imgSrc}` } alt={ imgAlt } className="sq-50" />
      <p className="sub-text">{ description }</p>
    </div>
  </Link>
);

export default Card;
