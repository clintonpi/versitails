import React from 'react';
import ArticleSkeleton from '../ArticleSkeleton/ArticleSkeleton';

const generateSkeleton = () => {
  const skeletonList = [];

  for (let skeletonCount = 0; skeletonCount < 10; skeletonCount += 1) {
    skeletonList.push(<ArticleSkeleton key={ skeletonCount } />);
  }

  return skeletonList;
};

export default generateSkeleton;
