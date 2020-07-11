import React from 'react';

import Routes from './src/routes';

global.api = "http://localhost:8080";
global.makeURL = function(path) {
  return `${global.api}${path}`;
}

const App: React.FC = () => {
  return <Routes />;
};

export default App;
