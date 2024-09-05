import React, { useState } from 'react'
import './App.css';
import ProfileBody from './components/ProfileBody/ProfileBody';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AuthContext from './contexts/authContext';
import TokenContext from './contexts/tokenContext';
import RefreshContext from './contexts/refreshContext';
//import { encryptUserId, encodeUsername } from './utils/encryption'; // Import the encryption and encoding functions

function App() {

  const [auth, setAuth] = useState(window.localStorage.getItem('auth'))
  const [token, setToken] = useState(window.localStorage.getItem('token'))
  const [refresh, setRefresh] = useState(false)
  const [url, setUrl] = useState('null')


  
  return (
    <AuthContext.Provider value={{
      auth: auth,
      url: url,
      login: (keepLogged, url) => {
        setAuth(true)
        console.log('setAuth')
        setUrl(url)
        console.log('setUrl', url)
        //if (keepLogged)
        window.localStorage.setItem('auth', 'true')
      },
      logout: () => {
        window.localStorage.setItem('auth', 'false')
        setAuth(false)
      }
    }}>
      <TokenContext.Provider value={{
        token: token,
        saveToken: (newtoken, keepLogged) => {
          setToken(newtoken)
          window.localStorage.setItem('token', newtoken)
        }
      }}>
        <RefreshContext.Provider value={{
          refresh: refresh,
          Refresh: () => { (refresh === false) ? setRefresh(true) : (setRefresh(false)) },
        }}>
          <AuthContext.Consumer>
            {(authContext) => (
              <Router>
                {console.log('auth', authContext.auth)}
                {console.log('url', authContext.url)}
                <div className="App">
                    <Routes>
                      <Route path={`/:profileid`}
                        element={authContext.auth ? (<ProfileBody />) : (<Navigate to={`/`} />)} />
                      <Route path='/register'
                        element={<Register />} />
                      <Route exact path='/'
                        element={
                          (authContext.url !== 'null') ? (authContext.auth ? (<Navigate to={`/${authContext.url}`} />) : (<Login />)) : (<Login />)} />
                    </Routes>
                </div>
              </Router>
            )}
          </AuthContext.Consumer>
        </RefreshContext.Provider>
      </TokenContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;