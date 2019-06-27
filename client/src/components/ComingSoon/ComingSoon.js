import React, { Component, Fragment } from 'react';
import { documentTitle } from '../../utils';

class AdmissionProb extends Component {
  constructor(props) {
    super(props);

    this.title = this.props.title;
  }

  componentDidMount() {
    document.title = `${documentTitle}${this.title}`;
    scroll(0, 0);
  }

  render() {
    return (
      <Fragment>
        <h2 className="main-text">{ this.title }</h2>
        <main className="flex column w-700 p-10 bc-c1 bx-sh-fx bd-r-20 txt-al-c ttn-3">
          <p className="sub-text break-word" style={{ fontSize: '3rem' }}>Coming soon, check back later.</p>
        </main>
      </Fragment>
    );
  }
}

export default AdmissionProb;
