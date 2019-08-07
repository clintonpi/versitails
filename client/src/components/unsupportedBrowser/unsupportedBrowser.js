// Seperated this file because of data savers in browsers.

import './unsupportedBrowser.scss';

(() => {
  // From MDN, but modified
  let hasTouchScreen = false;
  if ('maxTouchPoints' in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ('msMaxTouchPoints' in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
  } else {
    const mQ = window.matchMedia && matchMedia('(pointer:coarse)');
    if (mQ && mQ.media === '(pointer:coarse)') {
      hasTouchScreen = !!mQ.matches;
    } else if ('orientation' in window) {
      hasTouchScreen = true;
    } else {
      const UA = navigator.userAgent;
      hasTouchScreen = (
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
      );
    }
  }

  const isGoogleChrome = (() => {
    const isChromium = window.chrome;
    const winNav = window.navigator;
    const vendorName = winNav.vendor;
    const isOpera = typeof window.opr !== 'undefined';
    const isIEedge = winNav.userAgent.indexOf('Edge') > -1;
    const isIOSChrome = winNav.userAgent.match('CriOS');

    if (isIOSChrome
      || (isChromium !== null
      && typeof isChromium !== 'undefined'
      && vendorName === 'Google Inc.'
      && isOpera === false
      && isIEedge === false)
    ) {
      return true;
    }
  })();

  const unsupportedBrowser = document.querySelector('#unsupported-browser');

  const notify = (message) => {
    unsupportedBrowser.innerHTML = (`
      <div class="sub-text bc-c1 pos-ab t-0 w-100 p-10 txt-al-c bx-sh-fx">
        <p>${message}.</p>
        <div class="m-t-10 m-b-10">
          <a href="googlechrome://versitails.herokuapp.com/" class="main-text block w-700 mx-w-100 bc-c2 p-5 m-auto bd-r-20 bx-sh ol-0 cl-in pointer ttn-3">Click to use Google Chrome Browser</a>
          </div>
          <p>Or install/update it from your app store.</p>
        <button id="close" class="main-text bc-c2 p-10 m-t-20 bd-0 bd-r-20 bx-sh ol-0 cl-in pointer ttn-3">Close</button>
      </div>
    `);
  };

  if (!('serviceWorker' in navigator) || (hasTouchScreen && !('share' in navigator))) { // also checks outdated Google Chrome Browser
    notify('Your browser is unsupported');
  } else if (!isGoogleChrome) {
    notify('Please, use Google Chrome Browser for a better user experience');
  }

  if (unsupportedBrowser.hasChildNodes()) {
    document.querySelector('#close').addEventListener('click', () => {
      unsupportedBrowser.innerHTML = '';
    });
  }
})();
