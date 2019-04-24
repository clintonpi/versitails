const axios = require('axios');
const express = require('express');
const dotenv = require('dotenv');
const compiler = require('webpack');
const path = require('path');
const webpackDevMiddleWare = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');

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
    .then(newsRes => res.status(200).json(newsRes.data))
    .catch(() => {
      res.sendStatus(400);
    });
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
