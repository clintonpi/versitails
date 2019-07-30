import React, { Component, Fragment } from 'react';
import './News.scss';
import Article from '../Article/Article';
import { fetchArticles, generateSkeleton } from './newsUtils';
import { documentTitle, reload } from '../../utils';

class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      error: false,
      pageNumber: 1
    };

    this.title = 'News Update';
    this.mounted = false;
  }

  componentDidMount() {
    document.title = `${documentTitle}${this.title}`;
    scroll(0, 0);

    this.mounted = true;

    fetchArticles(this.state.pageNumber)
      .then((articles) => {
        if (this.mounted) {
          this.setState({ articles });
        }
      })
      .catch(() => {
        if (this.mounted) {
          this.setState({ error: true });
        }
      })
      .then(() => scroll(0, 0));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.error) {
      return (
        <Fragment>
          <h2 className="main-text">{ this.title }</h2>
          <main className="news flex">
            <div className="w-700 mx-w-100 m-t-10 m-b-10 m-auto p-10 bc-c1 bd-r-5 bx-sh-fx">
            <h3 className="main-text txt-al-c">Oops...</h3>
            <p className="sub-text m-t-10 txt-al-c">We tried our very best but still couldn&apos;t fetch your news 😢.</p>
            <small className="sub-text m-t-10 block txt-al-c">Please, check your internet connection.</small>
            <button className="sub-text bd-0 p-10 bd-r-20 block m-auto m-t-10 pointer bc-c2 bx-sh ol-0 ttn-3" onClick={ reload }>Try again</button>
            </div>
          </main>
        </Fragment>
      );
    }

    let key = 0;
    const { articles } = this.state;
    const articlesList = articles.length ? (
      articles.map(({
        title, description, url, provider, datePublished, image
      }) => {
        key += 1;

        return (
          <Article
            title={ title }
            description={ description }
            url={ url }
            source={ provider.name }
            date={ datePublished }
            thumbnail={ image.thumbnail }
            key={ key }
          />
        );
      })
    ) : (
      <Fragment>
        <div className="loader sq-50 circle m-auto m-t-10 m-b-10 ttn-3" />
        { generateSkeleton() }
      </Fragment>
    );

    return (
      <Fragment>
        <h2 className="main-text">{ this.title }</h2>
        <main className="news flex">
          { articlesList }
        </main>
      </Fragment>
    );
  }
}

export default News;
