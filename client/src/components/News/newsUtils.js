import React from 'react';
import ArticleSkeleton from '../ArticleSkeleton/ArticleSkeleton';

const fetchArticles = (pageNumber) => {
  const words = ['asuu', 'jamb', 'nigerian university', 'utme', 'waec', 'nigeria', 'unilag'];

  const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

  const keyword = `${getRandomWord()},${getRandomWord()},${getRandomWord()}`;

  return fetch(`/api/v1/news?pageNumber=${pageNumber}&keyword=${keyword}`)
    .then(res => res.json())
    .then((res) => {
      const newPageNumber = pageNumber + 1;
      return Promise.resolve([res.value, newPageNumber]);
    })
    .catch(() => Promise.reject());
};

const generateSkeleton = () => {
  const skeletonList = [];

  for (let skeletonCount = 0; skeletonCount < 10; skeletonCount += 1) {
    skeletonList.push(<ArticleSkeleton key={ skeletonCount } />);
  }

  return skeletonList;
};

const removeFetchListener = fetchFunction => window.removeEventListener('scroll', fetchFunction);

const addFetchListener = fetchFunction => window.addEventListener('scroll', fetchFunction);

export {
  fetchArticles, generateSkeleton, removeFetchListener, addFetchListener
};
