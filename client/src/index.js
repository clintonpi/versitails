import React from 'react';
import ReactDOM from 'react-dom';
import './index.html';
import './images/apple-60.png';
import './images/apple-76.png';
import './images/apple-120.png';
import './images/apple-152.png';
import './images/apple-167.png';
import './images/apple-180.png';
import './images/icon-48.png';
import './images/icon-96.png';
import './images/icon-128.png';
import './images/icon-144.png';
import './images/icon-192.png';
import './images/icon-256.png';
import './images/icon-384.png';
import './images/icon-512.png';
import './images/logo.svg';
import './images/calculator.svg';
import './images/graph.svg';
import './images/note.svg';
import './images/newspaper.svg';
import './images/question.svg';
import './images/score.svg';
import Root from './components/Root/Root';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root />, document.querySelector('#root'));

if (module.hot) {
  module.hot.accept(Root, () => {
    ReactDOM.render(<Root />, document.querySelector('#root'));
  });
}

registerServiceWorker();
