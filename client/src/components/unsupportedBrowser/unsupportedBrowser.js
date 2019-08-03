// Seperated this file because of data savers in browsers.

import './unsupportedBrowser.scss';

(() => {
  const isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

  if (!('serviceWorker' in navigator) || (isMobile && !('share' in navigator))) {
    const unsupportedBrowser = document.querySelector('#unsupported-browser');

    unsupportedBrowser.innerHTML = (`
      <div class="sub-text bc-c1 pos-ab t-0 w-100 p-10 txt-al-c bx-sh-fx">
        <p>Your browser is unsupported.</p>
        <div class="m-t-10 m-b-10">
          <a href="googlechrome://versitails.herokuapp.com/" class="main-text block w-700 mx-w-100 bc-c2 p-5 m-auto bd-r-20 bx-sh ol-0 cl-in pointer ttn-3">Click to use Google Chrome Browser</a>
        </div>
        <p>Or install/update it from your app store.</p>
        <button id="close" class="main-text bc-c2 p-10 m-t-20 bd-0 bd-r-20 bx-sh ol-0 cl-in pointer ttn-3">Close</button>
      </div>
    `);

    document.querySelector('#close').addEventListener('click', () => {
      unsupportedBrowser.innerHTML = '';
    });
  }
})();
