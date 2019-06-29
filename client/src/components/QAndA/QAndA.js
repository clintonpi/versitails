import React, { Component, Fragment } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { documentTitle } from '../../utils';

class QAndA extends Component {
  constructor(props) {
    super(props);

    this.title = 'Questions And Answers';
  }

  componentDidMount() {
    document.title = `${documentTitle}${this.title}`;
    scroll(0, 0);
  }

  render() {
    const disqusShortname = 'versitails';
    const disqusConfig = {
      url: 'https://versitails.herokuapp.com',
      identifier: 'QandA',
      title: this.title
    };

    return (
      <Fragment>
        <h2 className="main-text">{ this.title }</h2>
        <main>
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </main>
      </Fragment>
    );
  }
}

export default QAndA;
