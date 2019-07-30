import React from 'react';
import ArticleSkeleton from '../ArticleSkeleton/ArticleSkeleton';

const fetchArticles = (pageNumber) => {
  const words = ['asuu', 'jamb', 'nigerian university', 'utme', 'waec', 'nigeria'];

  const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

  const keyword = `${getRandomWord()},${getRandomWord()},${getRandomWord()}`;

  return fetch(`/api/v1/news?pageNumber=${pageNumber}&keyword=${keyword}`)
    .then(res => res.json())
    .then(res => Promise.resolve(res.value))
    .catch(() => Promise.reject());
};

const generateSkeleton = () => {
  const skeletonList = [];

  for (let skeletonCount = 0; skeletonCount < 10; skeletonCount += 1) {
    skeletonList.push(<ArticleSkeleton key={ skeletonCount } />);
  }

  return skeletonList;
};

export { fetchArticles, generateSkeleton };
