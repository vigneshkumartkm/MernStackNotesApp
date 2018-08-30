

import React from 'react';
import { connect } from 'react-redux';
import { startLogin , startSignUp, login , logout} from '../actions/auth';
import {reset} from '../actions/notes'

export class Login extends React.Component {
    
  state = { showLogin: true , showSignUp: false, error: ''}
  
  
  componentWillMount = () => {
      
      console.log(this.props)
      
      this.props.logout();
      this.props.reset();  
      
  }
    
  onSignUp = (e) => {
    e.preventDefault();
    let userId = e.target.elements.userId.value;
    let password = e.target.elements.password.value;
    this.props.startSignUp({userId, password})
    .then(() => {this.props.history.push(`/${userId}`)})
    .catch((err) => {
        if (err == 409) {this.setState(() => ({error: "User already exists"}))}
        else {this.setState(() => ({error: "Something went wrong"})) }})
      
    ;
  }

  onLogin = (e) => {
    e.preventDefault();
    let userId = e.target.elements.userId.value;
    let password = e.target.elements.password.value;
    this.props.startLogin({userId, password})
    .then(() => {this.props.history.push(`/${userId}`)})
    .catch((err) => {
        if (err == 404) {this.setState(() => ({error: "User Not Found"}))}
        else {this.setState(() => ({error: "Something went wrong"})) }})
    
  }
  
  toggleSignupLogin = () =>
  
  
  {
      
      this.setState((prevState) => ({showLogin: !prevState.showLogin , showSignUp: !prevState.showSignUp}))
  }

  render = () => {
      
    return (
        
        
        <div>
          
            {this.state.error && <h2>{this.state.error}</h2>}
        
            <button disabled={this.state.showSignUp} onClick={this.toggleSignupLogin}>SignUp</button>

            {this.state.showSignUp && 
        <div className="formclass">
                <form onSubmit={this.onSignUp} >
                    <h2> Signup </h2>
                        <span>UserId</span> <input type="text" name="userId"/>
                        <span>Password</span> <input type="password" name="password"/>
                    <button>Submit</button>
                </form> 
        </div>}

            <button disabled={this.state.showLogin} onClick={this.toggleSignupLogin}>Login</button>

            {this.state.showLogin && 
        <div className="formclass">
                <form onSubmit={this.onLogin} >
                    <h2> Login </h2>
                        <span>UserId</span> <input type="text" name="userId"/>
                        <span>Password</span> <input type="password" name="password"/>
                    <button>Submit</button>
                </form> 
        </div>
            }
        </div>       
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  startLogin: (userCredentials) => dispatch(startLogin(userCredentials)),
  startSignUp: (userCredentials) => dispatch(startSignUp(userCredentials)),
  logout: ()=> dispatch(logout()),
  reset: () => dispatch(reset())
});

export default connect(undefined, mapDispatchToProps)(Login); 



