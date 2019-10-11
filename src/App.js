import React, { useState, useEffect } from 'react';
import GoogleButton from 'react-google-button'
import RoutineContainer from './RoutineContainer'
import pose from './imgs/25.svg'
import './css/App.css';

function App(props) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (x) => {
    console.log(x)
  //  props.history.push('/')
    setUser(x)
    setIsAuthenticated(true)
    console.log('currently logged in as: ', x.name)
  }
  const logout = () => {
    fetch(`https://vinyasa-backend.herokuapp.com/logout`,{method: 'GET',
credentials: 'include'})
    setIsAuthenticated(false)
    setUser(null)
  }

  useEffect(() => {
    fetch(`https://vinyasa-backend.herokuapp.com/getUser`,{method: 'GET', credentials: 'include'})
      .then(r => r.json())
      .then(json => {
        if (json.email){
        login(json)
      }
      })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
          <img src={pose} className="App-logo" alt="logo" />
          <RoutineContainer />
          <p>
            Vinyasa Flow
          </p>
          { !isAuthenticated ? <a href="https://vinyasa-backend.herokuapp.com/auth/google"><GoogleButton/></a> : <button onClick={logout}>Sign out {user.name}</button> }
      </header>
    </div>
  );
}

export default App;
