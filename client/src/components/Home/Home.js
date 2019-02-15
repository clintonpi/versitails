import React from 'react';
import './Home.scss';
import features from './features';
import Card from '../Card/Card';

const Home = () => (
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
);

export default Home;
