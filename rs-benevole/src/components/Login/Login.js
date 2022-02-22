import React from 'react';
import styles from './Login.module.css'
import {Link, Navigate} from 'react-router-dom'
import axios from '../../axios';
import TokenContext from '../../contexts/tokenContext';
import AuthContext from '../../contexts/authContext';

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            inputEmail :'franz-wer770@hotmail.fr',
            inputPassword :'azerty',
            err:false,
            token:undefined,
            keepLogged:false
        };
        //this.logging = this.logging.bind(this)

    }
    
    logging = async (ctx1, ctx2) => {
        try{
            const token = await axios.get('/login',{
                params: {
                    email:this.state.inputEmail,
                    password:this.state.inputPassword
                }
            })
            
            this.setState({
                inputEmail : '',
                inputPassword : '',
                err:false,
            });

            ctx1.saveToken(token, this.state.keepLogged)
            ctx2.login(this.state.keepLogged)
        }

        catch(err){
            if (err.response.status === 401){
                this.setState({
                    err:true
                });
            }
        }

    }



    render(){

        return (
            <AuthContext.Consumer>
                {objau => (
                    objau.auth ? (

                        <Navigate push to="/home" />
                        ) : (
                            <TokenContext.Consumer>
                        {objto => (
                            <div className={styles.hh}>
                                <div>
                                    <label>E-mail</label>
                                    <input value={this.state.inputEmail} onChange={e=>{this.setState({inputEmail: e.target.value})}}></input>
                                    <label>Password</label>
                                    <input value={this.state.inputPassword} onChange={e=>{this.setState({inputPassword: e.target.value})}}></input>
                                    <button onClick={()=>this.logging(objto,objau)}>Log in</button>
                                    <label>remember me</label>
                                    <input type='checkbox' checked={this.state.keepLogged} onChange={(e)=> this.setState({keepLogged : e.target.checked})}></input>
                                </div>
                                {this.state.err ? (<div className={styles.errMessage}>Authentication error : Wrong credentials</div>)
                                :(<></>)}
                                <nav>
                                    <Link to='/' >forgot password ?</Link>
                                    <Link to='/register'>Register now !</Link>
                                </nav>
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