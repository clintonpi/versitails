import React, { Component, Fragment } from 'react';
import faculties from './faculties';
import { documentTitle } from '../../utils';

class AdmissionProb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Your result should appear here.',
      selectedFaculty: 'Arts',
      selectedCourse: 'Creative Arts',
      aggregate: null
    };

    this.title = 'Admission Probability';
    this.mounted = false;

    this.handleFacultySelect = this.handleFacultySelect.bind(this);
    this.getProbability = this.getProbability.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    document.title = `${documentTitle}${this.title}`;
    scroll(0, 0);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleFacultySelect(e) {
    const targetValue = e.target.value;

    this.setState({
      selectedFaculty: targetValue,
      selectedCourse: faculties[targetValue][0]
      // Automatically selecting the first course because onChange will not be
      // fired when the faculty changes
    });
  }

  getProbability(e) {
    e.preventDefault();

    this.setState({ message: 'Calculating probability...' });
    scroll(0, 0);

    fetch(`/api/v1/admission-probability?faculty=${this.state.selectedFaculty}&course=${this.state.selectedCourse}&aggregate=${this.state.aggregate}`)
      .then(res => res.json())
      .then(({ message }) => {
        if (this.mounted) {
          this.setState({ message });
          scroll(0, 0);
        }
      })
      .catch(() => {
        if (this.mounted) {
          this.setState({ message: 'Your request was unsuccessful. Check your internet connection.' });
          scroll(0, 0);
        }
      });
  }

  render() {
    return (
      <Fragment>
        <h2 className="main-text">{ this.title }</h2>
        <main className="flex column w-700 txt-al-c">
          <p className="sub-text w-100 p-10 m-b-20 bc-c1 bd-r-5 bx-sh-fx ttn-3 break-word">{ this.state.message }</p>
          <form onSubmit={ e => this.getProbability(e) } className="flex column m-t-20">
            <label htmlFor="faculty" className="sub-text">Select your faculty</label>
            <select id="faculty" autoFocus onChange={ e => this.handleFacultySelect(e) } className="w-100 p-10 m-t-10 m-b-20 bd-0 ol-0 bd-r-20 bx-sh bc-c1 main-text ttn-3 pointer">
              {
                Object.keys(faculties).map(faculty => <option key={ faculty }>{ faculty }</option>)
              }
            </select>
            <label htmlFor="course" className="sub-text">Select your course</label>
            <select id="course" onChange={ e => this.setState({ selectedCourse: e.target.value }) } className="w-100 p-10 m-t-10 m-b-20 bd-0 ol-0 bd-r-20 bx-sh bc-c1 main-text ttn-3 pointer">
              {
                Object.values(faculties[this.state.selectedFaculty])
                  .map(course => <option key={ course }>{ course }</option>)
              }
            </select>
            <label htmlFor="aggregate" className="sub-text">Enter your aggregate</label>
            <input type="number" min="0" max="100" step="0.01" id="aggregate" onChange={ e => this.setState({ aggregate: e.target.value }) } className="w-100 p-10 m-t-10 m-b-20 bd-0 ol-0 bd-r-20 bx-sh bc-c1 main-text txt-al-c ttn-3" required />
            <input type="submit" value="Check" className="w-100 p-10 m-t-10 m-b-20 bd-0 ol-0 bd-r-20 bx-sh bc-c1 main-text ttn-3 pointer" />
          </form>
        </main>
      </Fragment>
    );
  }
}

export default AdmissionProb;
