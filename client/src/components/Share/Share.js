import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Share.scss';

class Share extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: 'closed',
      copied: false
    };

    this.textToShare = React.createRef();

    this.setModal = this.setModal.bind(this);
    this.share = this.share.bind(this);
    this.copyText = this.copyText.bind(this);
    this.reset = this.reset.bind(this);
  }

  setModal(modalState = 'opened', copiedState = false) {
    this.setState({
      modal: modalState,
      copied: copiedState
    });
  }

  share() {
    if ('share' in navigator) {
      return navigator.share({
        title: 'Versitails',
        text: "Check out Versitails, it's a popular app for post-U.T.M.E candidates and it's really cool!",
        url: 'https://versitails.herokuapp.com'
      })
        .catch(this.setModal);
    }

    return this.setModal();
  }

  copyText() {
    this.textToShare.current.select();
    document.execCommand('copy');
    this.setState({
      copied: true
    });
  }

  reset() {
    this.setState({
      modal: 'closing'
    });

    setTimeout(() => {
      this.setModal('closed');
    }, 500);
  }

  render() {
    return (
      <div className="share">
        <button className="nav-btn pill highlight" aria-label="share" onClick={ this.share }><FontAwesomeIcon icon="share-alt" /></button>
        <div className={`modal ${this.state.modal === 'opened' ? 'visible' : 'hidden'} ttn-3`}>
          {
            (() => {
              if (this.state.modal !== 'closed') {
                return (
                  <Fragment>
                    <div className="overlay w-100 h-100 pos-fx t-0 l-0" onClick={ this.reset } />
                    <div className="share-wrap sub-text pos-ab">
                      <textarea
                      rows="3"
                      readOnly
                      ref={ this.textToShare }
                      tabIndex="-1"
                      defaultValue="Check out Versitails, it&apos;s a popular app for post-U.T.M.E candidates and it&apos;s really cool! https://versitails.herokuapp.com"
                      className="bc-c1 w-100 cl-in ff-in p-10 bd-r-5 bd-0 bx-sh-fx ol-0 txt-al-c ttn-3 mn-w-100 mx-w-100"
                      />
                      {
                        (() => {
                          if (!this.state.copied) {
                            return (
                              <button className="bc-c1 w-100 cl-in ff-in fs-in m-t-10 p-10 bd-r-5 bd-0 bx-sh-fx ol-0 txt-al-c ttn-3 pointer" onClick={ this.copyText }>
                                Click here to copy the text above.
                              </button>
                            );
                          }

                          return (
                            <button className="bc-c1 w-100 cl-in ff-in fs-in m-t-10 p-10 bd-r-5 bd-0 bx-sh-fx ol-0 txt-al-c ttn-3 pointer" onClick={ this.reset }>
                              <FontAwesomeIcon icon="check-circle" /> The text has been copied!
                            </button>
                          );
                        })()
                      }
                    </div>
                  </Fragment>
                );
              }
            })()
          }
        </div>
      </div>
    );
  }
}

export default Share;
