import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';
import GoogleButton from 'react-google-button';
import RoutineContainer from './RoutineContainer';
import pose from './imgs/25.svg';
import './css/App.css';


function App(props) {

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountMenu, setAccountMenu] = useState(false);
  const { history } = props;

  const login = (x) => {

    //history.push('/')
    setUser(x);
    setIsAuthenticated(true);
    console.log('currently logged in as: ', x.name);
  }

  const handleLogin = async () => {

    const user = await fetch(`https://vinyasa-backend.herokuapp.com/`, {
      method: 'GET',
      credentials: 'include',
    }).then((r) => r.json());

    if (user.email) {
      login(user);
    }
  }

  const logout = () => {

    fetch(`https://vinyasa-backend.herokuapp.com/logout`,{method: 'GET', credentials: 'include'});
    setAccountMenu(false);
    setIsAuthenticated(false);
    setUser(null);
  }

  useEffect(() => {

    handleLogin();
  }, []);

  return (
    <div className='App'>
      <div className='App-body'>
          <img src={pose} className='App-logo' alt='logo' />
          <RoutineContainer isAuthenticated={isAuthenticated} user={user} />
          {isAuthenticated ?
            <img className='avatar' src={user.photo} alt={'avatar'} onClick={()=>setAccountMenu(!accountMenu)} />
          :
            <Icon path={mdiAccountCircle}
              size={2}
              color='#92a3a8'
              onClick={() => setAccountMenu(!accountMenu)}
            />
          }
          {accountMenu ? 
            !isAuthenticated ? 
              <div>
                <br />
                <a href='https://vinyasa-backend.herokuapp.com/auth/google'><GoogleButton /></a>
              </div> 
            : 
              <div>
                <br />
                <button onClick={logout}>
                  Sign out {user.name}
                </button>
              </div> 
          : 
            null
          }
          <p>
            Vinyasa Flow
          </p>
      </div>
    </div>
  );
}

export default App;
