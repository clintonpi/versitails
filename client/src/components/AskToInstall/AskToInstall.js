import React, { Component } from 'react';

class AskToInstall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: true
    };

    this.closePrompt = this.closePrompt.bind(this);
    this.promptInstall = this.promptInstall.bind(this);
  }

  closePrompt() {
    this.setState({ isActive: false });
  }

  promptInstall() {
    this.props.deferredPrompt.prompt();
    this.closePrompt();
  }

  render() {
    return this.state.isActive
      ? (
        <div className="overlay flex w-100 h-100 pos-fx t-0 l-0 p-10">
          <div className="install-prompt m-auto bc-c1 bd-r-5 p-10 ttn-3">
            <p className="sub-text txt-al-c">Do you want to install Versitails app for free, with 0MB?</p>
            <div className="flex jst-cnt-sa m-t-20">
              <button onClick={ this.promptInstall } className="main-text bc-c2 p-10 bd-0 bd-r-20 bx-sh ol-0 cl-in pointer ttn-3">Yes, please.</button>
              <button onClick={ this.closePrompt } className="main-text bc-c2 p-10 bd-0 bd-r-20 bx-sh ol-0 cl-in pointer ttn-3">No, leave me alone.</button>
            </div>
          </div>
        </div>
      )
      : '';
  }
}

export default AskToInstall;
