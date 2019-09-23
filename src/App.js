import React from 'react';
import pose from './imgs/1.svg'
import './css/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="mat">
          <img src={pose} className="App-logo" alt="logo" />
          <p>
            Vinyasa Flow
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
