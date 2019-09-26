import React from 'react';
import RoutineContainer from './RoutineContainer'
import pose from './imgs/25.svg'
import './css/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <img src={pose} className="App-logo" alt="logo" />
          <RoutineContainer />
          <p>
            Vinyasa Flow
          </p>
      </header>
    </div>
  );
}

export default App;
