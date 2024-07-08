import React from 'react';
import './Login.css'
import { Link, Navigate } from 'react-router-dom'
import axios from '../../axios';
import TokenContext from '../../contexts/tokenContext';
import AuthContext from '../../contexts/authContext';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputEmail: 'admin@admin.com',
            inputPassword: 'admin',
            err: false,
            token: undefined,
            keepLogged: false
        };
    }

    logging = async (tokenContext, authContext) => {
        try {
            const response = await axios.post('/login', {
                email: this.state.inputEmail,
                password: this.state.inputPassword
            });
            const { data: token } = response;

            this.setState({ inputEmail: '', inputPassword: '', err: false });
            tokenContext.saveToken(token, this.state.keepLogged);
            authContext.login(this.state.keepLogged);
        } catch (error) {
            console.error('Login error:', error);
            this.setState({ err: true });
        }
    }

    render() {
        return (
            <AuthContext.Consumer>
                {authContext => (
                    authContext.auth ? (
                        <Navigate to="/home" replace />
                    ) : (
                        <TokenContext.Consumer>
                            {tokenContext => (
                                <div className='page'>
                                    <div className="hh">
                                        <img className="background" src='shutterstock_1155881311_FEAT.jpg' alt='login background' />
                                        <h1 className='title-p1'>WELCOME<br /><span className='title-p2'>WORLD CHANGER</span></h1>
                                        <div className="formular">
                                            <h2>Sign In</h2>
                                            {this.state.err && <div className="errMessage">Authentication error: Wrong credentials</div>}
                                            <input placeholder="Email" value={this.state.inputEmail} onChange={e => this.setState({ inputEmail: e.target.value })} />
                                            <input type='password' placeholder="Password" value={this.state.inputPassword} onChange={e => this.setState({ inputPassword: e.target.value })} />
                                            <div className="rememberCheckbox form-check form-switch">
                                                <input className="form-check-input" type='checkbox' checked={this.state.keepLogged} onChange={e => this.setState({ keepLogged: e.target.checked })} />
                                                <label className="form-check-label">Remember me</label>
                                            </div>
                                            <button onClick={() => this.logging(tokenContext, authContext)}>Next</button>
                                            <nav>
                                                <Link to='/forgot-password'>Forgot password?</Link>
                                                <Link to='/register'>Register now!</Link>
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
                            )}
                        </TokenContext.Consumer>
                    )
                )}
            </AuthContext.Consumer>
        )
    }
}

export default Login;
