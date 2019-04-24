import React from 'react';
import './Article.scss';

const removeBoldTag = sentence => sentence.replace(/(<b>|<\/b>)/g, '');

const formatDescription = (description) => {
  const shortDescription = description.slice(0, 200);
  const shortDescriptionLength = shortDescription.length;
  // The length of shorDescription is not fixed; some descriptions are not up to 200 letters.

  const readMore = ' Read more.';

  // Use lastIndexOf to target the last occurence of the dot(s)
  if (shortDescription.lastIndexOf('...') === shortDescriptionLength - 3) {
    return shortDescription.concat(`${readMore}`);
  }

  if (shortDescription.lastIndexOf('..') === shortDescriptionLength - 2) {
    return shortDescription.concat(`.${readMore}`);
  }

  if (shortDescription.lastIndexOf('.') === shortDescriptionLength - 1) {
    return shortDescription.concat(`..${readMore}`);
  }

  return shortDescription.concat(`...${readMore}`);
};

const Article = ({
  title, description, url, source, date, thumbnail
}) => (
  <a href={ url } target="_blank" rel="noopener noreferrer" className="w-700 mx-w-100 m-t-10 m-b-10 m-auto p-10 bc-c1 bd-r-5 bx-sh ol-0 ttn-3">
    <small className="sub-text">{ source }</small>
    <h2 className="main-text m-t-10">{ removeBoldTag(title) }</h2>
    <div className="m-t-10 m-b-10">
      <div style={{ backgroundImage: `url(${thumbnail})` }} className="fill-bg sq-80 bd-r-5 bc-c2 ttn-3" />
      <p className="break-word sub-text m-t-10">{ formatDescription(removeBoldTag(description)) }</p>
    </div>
    <small className="sub-text">{ date.split('T').join(' ') }</small>
  </a>
);

export default Article;
