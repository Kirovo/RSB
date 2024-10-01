import React, { useState, useContext } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import AuthContext from '../../contexts/authContext';

const Login = () => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [err, setErr] = useState(false);
    const [keepLogged, setKeepLogged] = useState(false);

    const authContext = useContext(AuthContext);

    const logging = async () => {
        try {
            const response = await axios.post('/login', {
                email: inputEmail,
                password: inputPassword
            });

            const profileId = response.data.profile.profile.id;
            const token = response.data.token;


            console.log('Login profileId', profileId);
            console.log('Login token', token);
            authContext.login(keepLogged,profileId,token);

            // navigate(`/${url}`);

        } catch (error) {
            console.error('Login error:', error);
            setErr(true);
        }
    }

    return (
        <div className='page'>
            {console.log('Login')}
            <div className="hh">
                <img className="background" src='shutterstock_1155881311_FEAT.jpg' alt='login background' />
                <h1 className='title-p1'>WELCOME<br /><span className='title-p2'>WORLD CHANGER</span></h1>
                <div className="formular">
                    <h2>Sign In</h2>
                    {err && <div className="errMessage">Authentication error: Wrong credentials</div>}
                    <input id='email' placeholder="Email" value={inputEmail} onChange={e => setInputEmail(e.target.value)} />
                    <input id='password' type='password' placeholder="Password" value={inputPassword} onChange={e => setInputPassword(e.target.value)} />
                    <div className="rememberCheckbox form-check form-switch">
                        <input className="form-check-input" type='checkbox' checked={keepLogged} onChange={e => setKeepLogged(e.target.checked)} />
                        <label className="form-check-label">Remember me</label>
                    </div>
                    <button id='login' onClick={async () => await logging()}>Next</button>
                    <nav>
                        <Link to='/forgot-password' id='forgot-password'>Forgot password?</Link>
                        <Link to='/register' id='register'>Register now!</Link>
                    </nav>
                </div>
            </div>
            <div className='site-description'>
                <p className='copyright'>Copyright &#169; Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                <div className='details'>
                    <h1 className='title-p1'>WELCOME<br /><span className='title-p2'>WORLD CHANGER</span></h1>
                    <p className='paragraphe'>Lorem ipsum dolor sit amet. Quo Quis dignissimos in omnis deserunt sit consectetur dolorem...</p>
                </div>
                <div className='templates-holder'>
                    <div className='template-1'></div>
                    <div className='template-2'></div>
                    <div className='template-3'></div>
                </div>
            </div>
        </div>
    )
}

export default Login;