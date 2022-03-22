import React from 'react';
import './Login.css'
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
            console.log(err);
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
                            <div className='page'>
                                <div className="hh">
                                    <img className="background" src='shutterstock_1155881311_FEAT.jpg' alt='login background'></img>
                                    <h1 className='title-p1'>WELCOME<br />
                                    <span className='title-p2'>WORLD CHANGER</span></h1>
                                    <div className="formular">
                                        <h2>Sign In</h2>
                                        {this.state.err ? (<div className="errMessage">Authentication error : Wrong credentials</div>)
                                        :(<></>)}
                                        <input value={this.state.inputEmail} onChange={e=>{this.setState({inputEmail: e.target.value})}}></input>
                                        <input type='password' value={this.state.inputPassword} onChange={e=>{this.setState({inputPassword: e.target.value})}}></input>
                                        <div className="rememberCheckbox form-check form-switch">
                                            <input className="form-check-input" type='checkbox' checked={this.state.keepLogged} onChange={(e)=> this.setState({keepLogged : e.target.checked})}></input>
                                            <label className="form-check-label">Remember me</label>
                                        </div>
                                            <button onClick={()=>this.logging(objto,objau)}>Next</button>
                                        <nav>
                                        <Link to='/' >Forgot password ?</Link>
                                        <Link to='/register'>Register now !</Link>
                                        </nav>
                                    </div>
                                </div>
                                <div className='snapper'></div>
                                <div className='site-description'>
                                    <p className='copyright'>Copyright &#169; : Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <div className='details'>
                                        <h1 className='title-p1'>WELCOME<br />
                                        <span className='title-p2'>WORLD CHANGER</span></h1>
                                        <p>Lorem ipsum dolor sit amet. Quo Quis dignissimos in omnis deserunt sit consectetur dolorem qui deleniti vero et sint pariatur eos inventore dignissimos sed enim Quis. Aut omnis praesentium et quasi molestias et dolores dolores est facere molestias. Est autem consectetur eum autem quis qui asperiores blanditiis sed dolores incidunt!
                                            Sit exercitationem Quis rem nihil commodi rem illo pariatur et laboriosam corporis. Aut alias recusandae sit quia earum eum enim excepturi aut natus vitae non aliquam facere fugiat odit eum voluptas eligendi? At rerum suscipit fugit asperiores 33 nisi quia sed vero excepturi est fugit exercitationem id deserunt rerum? Et architecto quasi aut fuga esse est aliquam ratione.
                                            Vel fugiat incidunt vel rerum tempora ut quisquam omnis est optio dolorem ab quam quia qui perferendis quibusdam ea quae omnis. Eum quod dolores qui eveniet mollitia quo tenetur mollitia. Sed dolor voluptatibus aut consectetur aspernatur qui culpa excepturi ut sint praesentium ea facere placeat eum quia quis.
                                            Et iure voluptas ut atque sunt aut voluptates dolorem ea assumenda iste sit sint corporis et aliquid debitis qui aliquid molestias. Et internos temporibus et ullam autem qui distinctio iste! Et dicta excepturi ut ratione amet est dignissimos facere est perspiciatis consequatur non fuga dolor aut beatae nesciunt id rerum reprehenderit.
                                            Rem quae architecto ad nobis sint quia ratione. Qui deserunt atque in alias natus sed incidunt unde aut perspiciatis voluptates et molestiae temporibus et sint autem!
                                        </p>
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