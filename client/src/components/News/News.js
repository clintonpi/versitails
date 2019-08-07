import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './News.scss';
import Article from '../Article/Article';
import Loader from '../Loader/Loader';
import {
  fetchArticles, generateSkeleton, removeFetchListener, addFetchListener
} from './newsUtils';
import NewsResult from './NewsResult';
import { documentTitle, reload } from '../../utils';

class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      error: false,
      pageNumber: 1,
      loading: false,
      searchKeyword: '',
      noResult: false,
      lastResult: false
    };

    this.title = 'News Update';
    this.mounted = false;

    this.searchInput = React.createRef();

    this.fetchMore = this.fetchMore.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.search = this.search.bind(this);
  }

  fetchMore() {
    const { body } = document;
    const html = document.documentElement;

    const pageHeight = Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight
    );

    const scrolledHeight = window.pageYOffset + window.innerHeight;

    if (scrolledHeight > (pageHeight - 500)) { // 500px from the bottom of the page
      removeFetchListener(this.fetchMore);
      this.setState({ loading: true, lastResult: false });
      fetchArticles(this.state.pageNumber, this.state.searchKeyword)
        .then(([articles, newPageNumber]) => {
          if (this.mounted && articles.length > 0) {
            this.setState({
              articles: [
                ...this.state.articles,
                ...articles
              ],
              pageNumber: newPageNumber
            });
            addFetchListener(this.fetchMore);
          } else {
            this.setState({ lastResult: true });
          }
        })
        .catch(() => {
          if (this.mounted) {
            this.setState({ error: true });
          }
          scroll(0, 0);
        })
        .then(() => {
          if (this.mounted) {
            this.setState({ loading: false });
          }
        });
    }
  }

  getArticles(pageNumber, searchKeyword) {
    removeFetchListener(this.fetchMore);
    this.setState({ noResult: false });
    fetchArticles(pageNumber, searchKeyword)
      .then(([articles, newPageNumber]) => {
        if (this.mounted && articles.length > 0) {
          this.setState({ articles, pageNumber: newPageNumber });
          addFetchListener(this.fetchMore);
        } else {
          this.setState({ noResult: true });
        }
      })
      .catch(() => {
        if (this.mounted) {
          this.setState({ error: true });
        }
      })
      .then(() => {
        scroll(0, 0);
      });
  }

  search(e) {
    e.preventDefault();

    const searchKeyword = this.searchInput.current.value;

    this.setState({
      articles: [],
      pageNumber: 1,
      loading: false,
      searchKeyword,
      searchResultMessage: ''
    });

    this.getArticles(1, searchKeyword);
    scroll(0, 0);
  }

  componentDidMount() {
    document.title = `${documentTitle}${this.title}`;
    scroll(0, 0);

    this.mounted = true;
    this.getArticles(this.state.pageNumber);
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
            <p className="sub-text m-t-10 txt-al-c">We tried our very best, but still, couldn&apos;t fetch your news 😢.</p>
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
        <Loader />
        { generateSkeleton() }
      </Fragment>
    );

    return (
      <Fragment>
        <h2 className="main-text">{ this.title }</h2>
        <main className="news flex">
          <form onSubmit={ e => this.search(e) } className="search flex jst-cnt-sb w-700 mx-w-100 m-auto m-b-20">
            <input type="text" placeholder="Search for your interests here" className="sub-text bc-c1 ol-0 bd-0 bd-r-5 p-10 fs-in bx-sh ttn-3"
            ref={ this.searchInput } required />
            <button className="main-text bc-c1 ol-0 bd-0 circle p-10 fs-in bx-sh ttn-3 pointer" aria-label="search"><FontAwesomeIcon icon="search" /></button>
          </form>
          <NewsResult
            noResult={ this.state.noResult }
            lastResult={ this.state.lastResult }
            articlesList={ articlesList }
          />
          { this.state.loading ? <Loader /> : '' }
        </main>
      </Fragment>
    );
  }
}

export default News;
