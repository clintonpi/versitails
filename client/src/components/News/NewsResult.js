import React, { Fragment } from 'react';

const NewsResult = ({ noResult, lastResult, articlesList }) => {
  if (noResult) {
    return <p className="sub-text txt-al-c">No search result.</p>;
  }

  if (lastResult) {
    return (
        <Fragment>
          { articlesList }
          <p className="sub-text txt-al-c">You&apos;ve reached the end.</p>
        </Fragment>
    );
  }

  return (
      <Fragment>
        { articlesList }
      </Fragment>
  );
};

export default NewsResult;
