import React from 'react';
import logo from './logo.svg';
import './App.css';

import Pusher from 'pusher-js';

Pusher.logToConsole = true;

    const pusher = new Pusher('c007ac7359c638bacebe', {
      cluster: 'us2',
      forceTLS: true
    });

    
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
