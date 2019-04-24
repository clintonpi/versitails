import React from 'react';
import './ArticleSkeleton.scss';

const ArticleSkeleton = () => (
  <div className="w-700 mx-w-100 m-t-10 m-b-10 m-auto p-10 bc-c1 bd-r-5 bx-sh ttn-3">
    <div className="p-5 bd-r-20 bc-c2 ttn-3" style={{ width: '100px' }} />
    <div className="m-t-20 bd-r-20 bc-c2 ttn-3" style={{ padding: '15px', width: '85%' }} />
    <div className="m-t-10">
      <div className="sq-80 bd-r-5 bc-c2 ttn-3" />
      <div className="m-t-10 p-10 bd-r-20 bc-c2 ttn-3" />
      <div className="m-t-10 p-10 bd-r-20 bc-c2 ttn-3" />
    </div>
    <div className="m-t-20 p-5 bd-r-20 bc-c2 ttn-3" style={{ width: '150px' }} />
  </div>
);

export default ArticleSkeleton;
