// ========================================================================= //
// 
// Root JS file for clientside stream application.
// Clientside entrypoint, hydrates DOM already rendered on server.
// 
// ========================================================================= //


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let data;
if (window.__DATA__) {
  data = JSON.parse(window.__DATA__)
}

if (data) {
  ReactDOM.hydrate(<App user={data.user} stream={data.stream} />, document.getElementById('root'));
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}
// registerServiceWorker();
