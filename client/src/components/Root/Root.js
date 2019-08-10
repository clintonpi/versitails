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
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import './Root.scss';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import News from '../News/News';
import AggregateCalc from '../AggregateCalc/AggregateCalc';
import CourseReq from '../CourseReq/CourseReq';
import AdmissionProb from '../AdmissionProb/AdmissionProb';
import QAndA from '../QAndA/QAndA';
import PUtmeScore from '../PUtmeScore/PUtmeScore';
import Footer from '../Footer/Footer';
import AskToInstall from '../AskToInstall/AskToInstall';

library.add(faEllipsisH, faHome, faShareAlt, faSun, faMoon, faCheckCircle, faHeart, faSearch);

const saveTheme = theme => localStorage.setItem('theme', theme);

class Root extends Component {
  constructor(props) {
    super(props);

    this.default = 'default';
    this.dark = 'dark';
    this.deferredPrompt = null;

    this.state = {
      theme: this.default,
      timeToInstall: false
    };

    this.switchTo = this.switchTo.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  get theme() {
    return this.state.theme;
  }

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // This is the best place to add the event listener
      // as beforeinstallprompt takes some time after page load before it fires.
      e.preventDefault();

      this.deferredPrompt = e;
      setTimeout(() => this.setState({ timeToInstall: true }), 60000);
    });

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
          <div className={ `container${this.theme === this.dark ? ' dark' : ''} pos-rl z-in-0` }>
            <Navbar toggleTheme={ this.toggleTheme } theme={ this.theme } />
            <Route exact path='/' component={ Home } />
            <Route exact path='/news' component={ News } />
            <Route exact path='/calculate-aggregate-score' component={ AggregateCalc } />
            <Route exact path='/course-requirements' component={ CourseReq } />
            <Route exact path='/admission-probability' component={ AdmissionProb } />
            <Route exact path='/question' component={ QAndA } />
            <Route exact path='/post-utme-score' component={ PUtmeScore } />
            <Footer />
            { this.state.timeToInstall ? <AskToInstall deferredPrompt={ this.deferredPrompt } /> : '' }
          </div>
        </BrowserRouter>
    );
  }
}

export default Root;
