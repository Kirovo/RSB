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

  const [auth, setAuth] = useState(JSON.parse(window.localStorage.getItem('auth')))
  const [token, setToken] = useState(JSON.parse(window.localStorage.getItem('token')))
  const [refresh, setRefresh] = useState(false)

  return (
    <AuthContext.Provider value={{
      auth: auth,
      login: (keepLogged) => {
        setAuth(true)
        if (keepLogged)
          window.localStorage.setItem('auth', 'true')
      },
      logout: () => {
        setAuth(false)
        window.localStorage.setItem('auth', 'false')

      }
    }}>

      <TokenContext.Provider value={{
        token: token,
        saveToken: (newtoken, keepLogged) => {
          setToken(newtoken)
          if (keepLogged)
            window.localStorage.setItem('token', JSON.stringify(newtoken))
        }
      }}>
        <RefreshContext.Provider value={{
          refresh: refresh,
          Refresh: () => { (refresh === false) ? setRefresh(true) : (setRefresh(false)) },
        }}>
          <Router>
            <div className="App">
              <Routes>
                <Route exact path='/'
                  element={
                    auth ? (<Navigate push to="/home" />) : (<Login />)} />
                <Route path='/register'
                  element={
                    auth ? (<Navigate push to="/home" />) : (<Register />)} />
                <Route path='/home'
                  element={
                    auth ? (<ProfileBody />) : (<Navigate push to="/" />)} />
                <Route path='/users/:encodedUsername-:encryptedId'
                  element={
                    auth ? (<ProfileBody />) : (<Navigate push to="/" />)} /> {/* New route for user profiles */}
              </Routes>
            </div>
          </Router>
        </RefreshContext.Provider>
      </TokenContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;