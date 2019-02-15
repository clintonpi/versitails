import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import './Root.scss';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';

library.add(faEllipsisH, faHome, faShareAlt, faSun, faMoon, faCheckCircle, faHeart);

const saveTheme = theme => localStorage.setItem('theme', theme);

class Root extends Component {
  constructor(props) {
    super(props);

    this.default = 'default';
    this.dark = 'dark';

    this.state = {
      theme: this.default
    };

    this.switchTo = this.switchTo.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  get theme() {
    return this.state.theme;
  }

  componentDidMount() {
    const theme = localStorage.getItem('theme');

    if (theme === this.default || theme === this.dark) {
      return this.setState({
        theme
      });
    }

    return saveTheme(this.default);
  }

  switchTo(theme) {
    saveTheme(theme);
    this.setState({
      theme
    });
  }

  toggleTheme() {
    if (this.theme !== this.default) {
      return this.switchTo(this.default);
    }

    return this.switchTo(this.dark);
  }

  render() {
    document.querySelector('meta[name="theme-color"]').setAttribute('content', this.theme === this.default ? '#e6ecf0' : '#485460');

    return (
        <BrowserRouter>
          <div className={ `container${this.theme === this.dark ? ' dark' : ''}` }>
            <Navbar toggleTheme={ this.toggleTheme } theme={ this.theme } />
            <Route exact path='/' component={ Home } />
            <Footer />
          </div>
        </BrowserRouter>
    );
  }
}

export default Root;
