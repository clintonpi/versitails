import React, { Component, Fragment } from 'react';
import { documentTitle } from '../../utils';

class CourseReq extends Component {
  constructor(props) {
    super(props);

    this.title = 'Course Requirements';
    this.courseReqDoc = React.createRef();
  }

  componentDidMount() {
    document.title = `${documentTitle}${this.title}`;
    scroll(0, 0);
  }

  render() {
    return (
      <Fragment>
        <h2 className="main-text">{ this.title }</h2>
        <main className="flex column">
          <button className="m-b-20 p-10 bc-c1 ol-0 bd-0 bd-r-20 bx-sh sub-text fs-in pointer ttn-3" onClick={ () => this.courseReqDoc.current.requestFullscreen() }>Use fullscreen</button>
          <div className="flex" style={{ height: '50vh', overflow: 'hidden' }}>
            <iframe
              src="/public/Course Requirements 2019-2020.pdf"
              allow="fullscreen"
              title="Course Requirements 2019/2020"
              ref={ this.courseReqDoc }
              className="w-100 bc-c1"
            />
          </div>
          <a href="/public/Course Requirements 2019-2020.pdf" download="Course Requirements 2019-2020.pdf" className="block txt-al-c m-t-20 p-10 sub-text bc-c1 bd-r-20 bx-sh ol-0 pointer ttn-3">Download</a>
        </main>
      </Fragment>
    );
  }
}

export default CourseReq;
