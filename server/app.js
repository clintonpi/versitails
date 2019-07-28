const axios = require('axios');
const express = require('express');
const dotenv = require('dotenv');
const compiler = require('webpack');
const path = require('path');
const webpackDevMiddleWare = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');
const pool = require('./db/index.js');

const ENVIRONMENT = process.env.NODE_ENV;

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client')));

if (ENVIRONMENT === 'development' || ENVIRONMENT === 'development:client') {
  // Attach webpack dev server to running app
  ((serverInstance) => {
    const options = {
      historyApiFallback: true,
      hot: true,
      noInfo: true,
      publicPath: config.output.publicPath
    };
    const compilerConfig = compiler(config);
    serverInstance.use(webpackDevMiddleWare(compilerConfig, options));
    serverInstance.use(webpackHotMiddleware(compilerConfig));
  })(app);
}

const PORT = process.env.PORT || 2251;

app.get('/api/v1/news', (req, res) => {
  const { keyword, pageNumber } = req.query;

  axios.get(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=${pageNumber}&pageSize=10&q=${keyword}&safeSearch=true`, {
    headers: {
      'X-RapidAPI-Key': process.env.XRapidAPIKey
    }
  })
    .then((newsRes) => {
      const newsData = newsRes.data;
      newsData.value = newsData.value.sort((a, b) => a.datePublished < b.datePublished);
      return res.status(200).json(newsData);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.get('/api/v1/admission-probability', (req, res) => {
  const { faculty } = req.query;
  let { course, aggregate } = req.query;
  aggregate = parseFloat(aggregate);

  if (aggregate < 0 || aggregate > 100) return res.status(400).json({ message: 'Your aggregate is invalid.' });

  course = course.indexOf(' and ') > -1 ? course.replace('and', '&') : course;

  const text = 'SELECT merit FROM cutoff_marks WHERE year > 2016 AND faculty = $1 AND department = $2;';
  const values = [faculty, course];

  pool.query(text, values)
    .then((result) => {
      const resultRowsLength = result.rows.length;

      if (resultRowsLength === 0) return res.status(400).json({ message: 'Your selection is invalid.' });

      const average = (result.rows.reduce((sum, row) => sum + row.merit, 0)) / resultRowsLength;
      const probabilityPercent = parseFloat((aggregate ** 2) / average).toFixed(2);
      // i.e (aggregate / 100) * (aggregate / average) * 100

      return res.status(200).json({ message: `You have about a/an ${probabilityPercent}% chance based on previous cut-off marks only.` });
    })
    .catch(() => res.status(500).json({ message: 'There was an error while processing your request.' }));
});

app.get('*', (req, res) => {
  const { host } = req.headers;
  const isLocalHost = host === `localhost:${PORT}` || host === `127.0.0.1:${PORT}`;

  if (req.headers['x-forwarded-proto'] !== 'https' && !isLocalHost) {
    return res.redirect(`https://${host}${req.url}`);
  }

  return res.status(200).sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(PORT);

module.exports = app;
