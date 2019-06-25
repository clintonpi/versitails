import showScore from './aggregateAlg';

const aggregateHandler = {
  frontCard: null,
  backCard: null,

  prepareElements() {
    this.frontCard = document.querySelector('#front-card');
    this.backCard = document.querySelector('#back-card');
  },

  focusElement(elementId) {
    setTimeout(() => document.querySelector(elementId).focus(), 300);
  },

  getAggregate(e) {
    e.preventDefault();

    this.prepareElements();
    this.frontCard.classList.add('at-back');
    this.backCard.classList.remove('at-back');
    showScore();
    this.focusElement('#reset');
  },

  resetAggregate(e) {
    e.preventDefault();

    document.querySelector('#details').reset();
    this.backCard.classList.add('at-back');
    this.frontCard.classList.remove('at-back');
    this.focusElement('#utme-input');
  }
};

export default aggregateHandler;
