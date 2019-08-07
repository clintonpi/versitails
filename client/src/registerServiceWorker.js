import { reload } from './utils';

const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    const { serviceWorker } = navigator;

    serviceWorker.register('/serviceWorker.js');
    serviceWorker.addEventListener('controllerchange', reload);
  }
};

export default registerServiceWorker;
