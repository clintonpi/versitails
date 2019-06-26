import React, { Component, Fragment } from 'react';
import './Home.scss';
import features from './features';
import { documentTitle } from '../../utils';
import Card from '../Card/Card';

class Home extends Component {
  constructor(props) {
    super(props);

    this.title = 'Home';
  }

  componentDidMount() {
    document.title = `${documentTitle}${this.title}`;
    scroll(0, 0);
  }

  render() {
    return (
      <Fragment>
        <h2 className="main-text">{ this.title }</h2>
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
  }
}

export default Home;
