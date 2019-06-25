import React, { Component, Fragment } from 'react';
import './AggregateCalc.scss';
import aggregateHandler from './aggregateHandler';
import { documentTitle } from '../../utils';

class AggregateCalc extends Component {
  constructor(props) {
    super(props);

    this.title = 'Aggregate Calculator';
  }

  componentDidMount() {
    document.title = `${documentTitle}${this.title}`;
    scroll(0, 0);
  }

  render() {
    return (
      <Fragment>
        <h2 className="main-text">{ this.title }</h2>
        <main className="w-700 pos-rl m-t-20 z-in-m1">
          <div id="back-card" className="agg-card at-back bc-c1 w-100 flex column jst-cnt-sb h-100 bd-r-5 pos-ab ttn-3 bx-sh-fx txt-al-c z-in-0">
            <h3 className="main-text">Your Aggregate: </h3>
            <div className="outer-agg-circle circle bc-c2 flex bx-sh-fx ttn-3">
              <div className="agg-circle circle flex bc-c2 m-auto ttn-3">
                <span className="aggregate main-text m-auto ttn-3">0.00</span>
              </div>
            </div>
            <form onSubmit={ e => aggregateHandler.resetAggregate(e) }>
              <input type="submit" value="Reset" id="reset" className="input activate p-5 w-100 m-auto main-text bc-c2 bd-0 bd-r-20 fs-in ol-0 bx-sh ttn-3 pointer" />
            </form>
          </div>
          <div id="front-card" className="agg-card bc-c1 h-100 flex column bd-r-5 pos-rl ttn-3 bx-sh-fx txt-al-c z-in-0">
            <h3 className="main-text">Input Your Details</h3>
            <form id="details" className="flex column" onSubmit={ e => aggregateHandler.getAggregate(e) }>
              <label htmlFor="utme-input" className="sub-text">U.T.M.E Score</label>
              <input type="number" name="utme-input" autoFocus id="utme-input" className="input txt-al-c p-5 w-100 bc-c2 m-auto main-text bd-0 bd-r-20 m-t-10 m-b-20 fs-in ol-0 bx-sh ttn-3" min="0" max="400" required />
              <label htmlFor="p-utme-input" className="sub-text">Post-U.T.M.E Score</label>
              <input type="number" name="p-utme-input" id="p-utme-input" className="input txt-al-c p-5 w-100 bc-c2 m-auto main-text bd-0 bd-r-20 m-t-10 m-b-20 fs-in ol-0 bx-sh ttn-3" min="0" max="30" required />
              <label className="sub-text">Select O&apos;Level grades</label>
              <div className="select-wrap flex w-100 m-auto jst-cnt-sb m-t-20 m-b-20">
                <select className="ol-grades main-text bc-c2 bd-0 bd-r-20 fs-in ol-0 bx-sh ttn-3 pointer">
                  <option value="4.0">A1</option>
                  <option value="3.6">B2</option>
                  <option value="3.2">B3</option>
                  <option value="2.8">C4</option>
                  <option value="2.4">C5</option>
                  <option value="2.0">C6</option>
                </select>
                <select className="ol-grades main-text bc-c2 bd-0 bd-r-20 fs-in ol-0 bx-sh ttn-3 pointer">
                  <option value="4.0">A1</option>
                  <option value="3.6">B2</option>
                  <option value="3.2">B3</option>
                  <option value="2.8">C4</option>
                  <option value="2.4">C5</option>
                  <option value="2.0">C6</option>
                </select>
                <select className="ol-grades main-text bc-c2 bd-0 bd-r-20 fs-in ol-0 bx-sh ttn-3 pointer">
                  <option value="4.0">A1</option>
                  <option value="3.6">B2</option>
                  <option value="3.2">B3</option>
                  <option value="2.8">C4</option>
                  <option value="2.4">C5</option>
                  <option value="2.0">C6</option>
                </select>
                <select className="ol-grades main-text bc-c2 bd-0 bd-r-20 fs-in ol-0 bx-sh ttn-3 pointer">
                  <option value="4.0">A1</option>
                  <option value="3.6">B2</option>
                  <option value="3.2">B3</option>
                  <option value="2.8">C4</option>
                  <option value="2.4">C5</option>
                  <option value="2.0">C6</option>
                </select>
                <select className="ol-grades main-text bc-c2 bd-0 bd-r-20 fs-in ol-0 bx-sh ttn-3 pointer">
                  <option value="4.0">A1</option>
                  <option value="3.6">B2</option>
                  <option value="3.2">B3</option>
                  <option value="2.8">C4</option>
                  <option value="2.4">C5</option>
                  <option value="2.0">C6</option>
                </select>
              </div>
              <input type="submit" value="Calculate" id="submit" className="input activate p-5 w-100 m-auto main-text bc-c2 bd-0 bd-r-20 fs-in ol-0 bx-sh ttn-3 pointer" />
            </form>
          </div>
        </main>
      </Fragment>
    );
  }
}

export default AggregateCalc;
