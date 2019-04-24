import React, { Component, Fragment } from 'react';
import './News.scss';
import Article from '../Article/Article';
import ArticleSkeleton from '../ArticleSkeleton/ArticleSkeleton';

const reload = () => location.reload();

class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      error: false,
      pageNumber: 1
    };

    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;

    const words = ['asuu', 'jamb', 'nigerian university', 'utme', 'waec', 'nigeria'];

    const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

    const keyword = `${getRandomWord()},${getRandomWord()},${getRandomWord()}`;

    fetch(`/api/v1/news?pageNumber=${this.state.pageNumber}&keyword=${keyword}`)
      .then(res => res.json())
      .then((res) => {
        if (this.mounted) {
          this.setState({ articles: res.value });
        }
      })
      .catch(() => {
        if (this.mounted) {
          this.setState({ error: true });
        }
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    scroll(0, 0);

    if (this.state.error) {
      return (
        <main className="news flex">
          <div className="w-700 mx-w-100 m-t-10 m-b-10 m-auto p-10 bc-c1 bd-r-5 bx-sh-fx">
          <h3 className="main-text txt-al-c">Oops...</h3>
          <p className="sub-text m-t-10 txt-al-c">We tried our very best but still couldn&apos;t fetch your news 😢.</p>
          <small className="sub-text m-t-10 block txt-al-c">Please, check your internet connection.</small>
          <button className="sub-text bd-0 p-10 bd-r-20 block m-auto m-t-10 pointer bc-c2 bx-sh ol-0 ttn-3" onClick={ reload }>Try again</button>
          </div>
        </main>
      );
    }

    const { articles } = this.state;
    const articlesList = articles.length ? (
      articles.map(({
        title, description, url, provider, datePublished, image
      }) => (
        <Article
          title={ title }
          description={ description }
          url={ url }
          source={ provider.name }
          date={ datePublished }
          thumbnail={ image.thumbnail }
          key={ title }
        />
      ))
    ) : (
      <Fragment>
        <div className="loader sq-50 circle m-auto m-t-10 m-b-10 ttn-3" />
        {
          [1, 2, 3, 4, 5, 6, 7, 9, 10].map(num => <ArticleSkeleton key={ num } />)
        }
      </Fragment>
    );

    return (
      <main className="news flex">
        { articlesList }
      </main>
    );
  }
}

export default News;
