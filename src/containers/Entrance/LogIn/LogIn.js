import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './LogIn.module.css';
import {Link} from 'react-router-dom'
//import * as action from '../../../../store/action/index';

export default class LogIn extends Component {
    state = {
      email:'',
      password:''
    }
    handleChange = (input) => (e) => {
        e.preventDefault();
        this.setState({ [input]: e.target.value });
      };

   

  
   handleClick= (event) => {
    fetch('http://localhost:3003/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        })
    })
    .then(response => response.text())
    .then(data => {
        window.alert(data)
        //redirect to home page
    })
   }
    render () {
        return (
            <div className={classes.LogIn}>
                <form onSubmit={this.submitHandler}>
                    <label className={classes.LableLogin}>:אימייל</label>
                    <br/>
                    <input 
                    className={classes.InputLogin}
                    type="email" 
                    name='email'
                    value={this.state.email}
                    id="email"
                    onChange={this.handleChange('email')}/>
                    <br/>
                    <label className={classes.LableLogin}>:סיסמה</label> <br/>
                    <input
                    className={classes.InputLogin}
                     type="password" 
                     id="password"
                     name="password"
                     value={this.state.password}
                     onChange={this.handleChange('password')}/><br/><br/>
                    <button onClick={this.handleClick} className={classes.button} style={{ position:'absolute',right:"630px"}}>התחבר</button>
                    <Link to='/SignUp'>
                        <button className={classes.button} style={{ position:'absolute',right:"800px"}}>הירשם</button>
                    </Link>
                    <br/> <br/>
                    <br/>
                    <Link to='/ForgetPassword'>
                        <p>?שכחת סיסמה</p>
                    </Link>
                </form>
            </div>
        );
    }
}

/*const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};  */

