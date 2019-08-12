import React from 'react';
import Ask from '../Ask/Ask';

const AskToInstall = ({ deferredPrompt }) => <Ask
  question={ 'Do you want to install Versitails app for free, with 0MB' }
  action={ () => deferredPrompt.prompt() }
/>;

export default AskToInstall;
