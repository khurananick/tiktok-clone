import React from 'react';

import Routes from './src/routes';

global.api = {
  enabled: true,
  baseURL: "http://localhost:8080",
  makeURL: function(path) {
    return `${global.api.baseURL}${path}`;
  }
}

const App: React.FC = () => {
  return <Routes />;
};

export default App;
