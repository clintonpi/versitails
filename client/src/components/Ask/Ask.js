import React, { Component } from 'react';

class Ask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: true
    };

    this.closePrompt = this.closePrompt.bind(this);
    this.runAction = this.runAction.bind(this);
  }

  closePrompt() {
    this.setState({ isActive: false });
  }

  runAction() {
    this.closePrompt();
    this.props.action();
  }

  render() {
    return this.state.isActive
      ? (
        <div className="overlay flex w-100 h-100 pos-fx t-0 l-0 p-10">
          <div className="m-auto bc-c1 bd-r-5 ttn-3" style={{ padding: '20px' }}>
            <p className="sub-text txt-al-c">{ this.props.question }?</p>
            <div className="flex jst-cnt-sa m-t-20">
              <button onClick={ this.runAction } className="main-text bc-c2 p-10 bd-0 bd-r-20 bx-sh ol-0 cl-in pointer ttn-3">Yes, please.</button>
              <button onClick={ this.closePrompt } className="main-text bc-c2 p-10 bd-0 bd-r-20 bx-sh ol-0 cl-in pointer ttn-3">No, leave me alone.</button>
            </div>
          </div>
        </div>
      )
      : '';
  }
}

export default Ask;
