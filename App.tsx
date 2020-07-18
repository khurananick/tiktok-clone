import React from 'react';

import Routes from './src/routes';

global.api = {
  enabled: true,
  baseURL: "https://1e146361cd95.ngrok.io",
  makeURL: function(path) {
    return `${global.api.baseURL}${path}`;
  }
}

const App: React.FC = () => {
  return <Routes />;
};

export default App;
