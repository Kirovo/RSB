import React, {useState} from 'react'
import './App.css';
import Header from './components/Header/Header'
import Menu from './components/Menu/Menu';
import ProfileBody from './components/ProfileBody/ProfileBody';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Modal from './components/Modal/Modal';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import AuthContext from './contexts/authContext';
import ModalContext from './contexts/modalContext';
import TokenContext from './contexts/tokenContext';
import RefreshContext from './contexts/refreshContext';


function App() {

  const [auth, setAuth] = useState(JSON.parse(window.localStorage.getItem('auth')))
  const [token, setToken] = useState(JSON.parse(window.localStorage.getItem('token')))
  const [modal, setModal] = useState(undefined)
  const [refresh, setRefresh] = useState(false)

  return ( 
    <AuthContext.Provider value={{
      auth : auth,
      login:(keepLogged)=> {
        setAuth(true)
        if(keepLogged)
          window.localStorage.setItem('auth','true')
      },
      logout:()=> {
        setAuth(false)
        window.localStorage.setItem('auth','false')

      }
    }}>
      <ModalContext.Provider  value={{
        modal: modal,
        closeModal: ()=> {setModal(undefined)},
        createPostModal:()=> {setModal('createPost')}
      }}>
        <TokenContext.Provider value={{
          token:token,
          saveToken:(newtoken,keepLogged)=> {
            setToken(newtoken)
            if(keepLogged)
              window.localStorage.setItem('token',JSON.stringify(newtoken))
          }
        }}>
          <RefreshContext.Provider value={{
            refresh:refresh,
            Refresh:()=>{(refresh===false)? setRefresh(true):(setRefresh(false))},
        }}>
            <Router>
              {modal ? (<Modal />) : (<></>)}
                <div className="App">
                  <Header />
                  <Routes>
                    <Route exact path='/' 
                      element={
                        auth ? (<Navigate push to="/home" />) : (<Login />)}/>
                    <Route path='/register' 
                      element={
                        auth ? (<Navigate push to="/home" />) : (<Register />)} />
                    <Route path='/home' 
                      element={
                        auth ? (<><Menu /><ProfileBody /></>):(<Navigate push to="/" />)} />
                  </Routes>
                </div>
            </Router>
          </RefreshContext.Provider>
        </TokenContext.Provider>
      </ModalContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;
