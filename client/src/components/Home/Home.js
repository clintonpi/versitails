import React, { Fragment } from 'react';
import './Home.scss';
import features from './features';
import Card from '../Card/Card';
import { documentTitle } from '../../utils';

const Home = () => {
  document.title = `${documentTitle}Home`;
  scroll(0, 0);
  return (
    <Fragment>
      <h2 className="main-text">Home</h2>
      <main className="home flex">
      {
        features.map(feature => (
          <Card
            link={ feature.link }
            color={ feature.color }
            heading={ feature.heading }
            imgSrc={ feature.imgSrc }
            imgAlt={ feature.imgAlt }
            description={ feature.description }
            key={ feature.heading }
          />
        ))
      }
    </main>
    </Fragment>
  );
};

export default Home;
