import React from 'react';
import ReactDOM from 'react-dom';
import './index.html';
import './images/logo.svg';
import './images/calculator.svg';
import './images/graph.svg';
import './images/note.svg';
import './images/newspaper.svg';
import './images/question.svg';
import './images/score.svg';
import Root from './components/Root/Root';

ReactDOM.render(<Root />, document.querySelector('#root'));

if (module.hot) {
  module.hot.accept(Root, () => {
    ReactDOM.render(<Root />, document.querySelector('#root'));
  });
}
