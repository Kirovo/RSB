import React, { useState } from 'react'
import './App.css';
import ProfileBody from './components/ProfileBody/ProfileBody';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AuthContext from './contexts/authContext';
import RefreshContext from './contexts/refreshContext';
//import { encryptUserId, encodeUsername } from './utils/encryption'; // Import the encryption and encoding functions

function App() {

  const [profileId, setProfileId] = useState(undefined)
  const [token, setToken] = useState(undefined)
  const [refresh, setRefresh] = useState(false)


  
  return (
    <AuthContext.Provider value={{
      profileId: profileId,
      token: token,
      login: (keepLogged, profileId, token) => {
        setProfileId(profileId)
        console.log('setProfileId', profileId)
        setToken(token)
        console.log('setToken', token)
        // if (keepLogged)
        //   window.localStorage.setItem('token', token)
      },
      logout: () => {
        setProfileId(undefined)
        setToken(undefined)
        setRefresh(true)
      }
    }}>

        <RefreshContext.Provider value={{
          refresh: refresh,
          Refresh: () => { (refresh === false) ? setRefresh(true) : (setRefresh(false)) },
        }}>
          <AuthContext.Consumer>
            {(authContext) => (
              <Router>

                <div className="App">
                    <Routes>
                      <Route path={`/:profileid`}
                        element={authContext.token ? (<ProfileBody />) : (<Navigate to={`/`} />)} />
                      <Route path='/register'
                        element={<Register />} />
                      <Route exact path='/'
                        element={
                          (authContext.profileId) ? (authContext.token ? (<Navigate to={`/${authContext.profileId}`} />) : (<Login />)) : (<Login />)} />
                    </Routes>
                </div>
                {console.log('App profileId', authContext.profileId)}
                {console.log('App token', authContext.token)}
              </Router>
            )}
          </AuthContext.Consumer>
        </RefreshContext.Provider>

    </AuthContext.Provider>
  )
}

export default App;