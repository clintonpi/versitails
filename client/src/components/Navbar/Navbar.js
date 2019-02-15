import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.scss';
import Share from '../Share/Share';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.toggleTheme = this.props.toggleTheme;

    this.switchToDefault = this.switchToDefault.bind(this);
    this.switchToDark = this.switchToDark.bind(this);
  }

  get theme() {
    return this.props.theme;
  }

  switchToDefault() {
    if (this.theme !== 'default') {
      this.toggleTheme();
    }
  }

  switchToDark() {
    if (this.theme !== 'dark') {
      this.toggleTheme();
    }
  }

  render() {
    return (
      <nav className="bc-c1 bx-sh-fx flex jst-cnt-sa pos-fx t-0 l-0 w-100 ttn-3">
        <div className="logo">
          <Link to="/" className="ol-0">
            <img src="/dist/images/logo.svg" alt="Versitails" className="sq-50" />
            <h1><span className="green">Versi</span><span className="yellow">tails</span></h1>
          </Link>
        </div>
        <div className="nav-btn-wrapper flex">
          <NavLink to="/" tabIndex="-1"><button className="nav-btn pill highlight" aria-label="home"><FontAwesomeIcon icon="home" /></button></NavLink>
          <Share />
          <button className="nav-btn pill highlight" aria-label="switch to default theme" onClick={ this.switchToDefault }><FontAwesomeIcon icon="sun" /></button>
          <button className="nav-btn switch pos-rl" aria-label="toggle theme" data-theme={ this.theme } onClick={ this.toggleTheme }>
            <span className="track block" />
            <span className="handle block circle pos-ab t-0 b-0 l-0 m-auto ttn-3" />
          </button>
          <button className="nav-btn pill highlight" aria-label="switch to dark theme" onClick={ this.switchToDark }><FontAwesomeIcon icon="moon" /></button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
