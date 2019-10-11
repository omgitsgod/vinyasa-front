import React, { useState } from 'react';
import GoogleButton from 'react-google-button'
import RoutineContainer from './RoutineContainer'
import pose from './imgs/25.svg'
import './css/App.css';

function App(props) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (x) => {
    console.log(x)
    props.history.push('/')
    setUser(x)
    setIsAuthenticated(true)
    console.log('currently logged in as: ', x.name)
  }
  const logout = () => {
    fetch(`https://pictopal-backend.herokuapp.com/logout`,{method: 'GET',
credentials: 'include'})
    setIsAuthenticated(false)
    setUser(null)
  }
  return (
    <div className="App">
      <header className="App-header">
          { !isAuthenticated ? <a href="https://pictopal-backend.herokuapp.com/auth/google"><GoogleButton/></a> : <button>Sign out {user.name}</button> }
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
