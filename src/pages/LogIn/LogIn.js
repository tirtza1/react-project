import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input'
import classes from './LogIn.module.css';
import {Link} from 'react-router-dom'
import { checkValidity } from '../../validation/validate';
//import * as action from '../../../../store/action/index';

export default class LogIn extends Component {
    state = {
        user: {
          email: '',
          password: '',
        },
        userValidationRules: {
          email: {
            required: true,
            regExc: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          },
          password: { required: true, minLength: 8, maxLength: 15 },
        },
        userValid: {
          email: { valid: false, touched: false, errmessage: '' },
          password: { valid: false, touched: false, errmessage: '' },
        },
        isValidForm: false,
      };
     
      handleChange = (input) => (e) => {
        e.preventDefault();
        let updatedUser = this.state.user;
        let validUser = this.state.userValid;
        updatedUser[input] = e.target.value;
        validUser[input].touched = true;
        validUser[input].errmessage = checkValidity(
          updatedUser[input],
          this.state.userValidationRules[input]
        );
        validUser[input].valid = validUser[input].errmessage === '';
    
        let validForm = true;
        for (let field in validUser) {
          validForm = validUser[field].valid && validForm;
        }
        this.setState({
          user: updatedUser,
          userValid: validUser,
          isValidForm: validForm,
        });
      };

   

  
   handleClick= (event) => {
    fetch('http://localhost:3003/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: this.state.user.email.value,
            password: this.state.user.password.value
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
   }
    render () {
        let error = null;
        if (this.props.error) {
            error = <p style={{ color: 'red' }}>{this.props.error}</p>;
          }
        return (
            <div className={classes.LogIn}>
                <form onSubmit={this.submitHandler}>
                <Input
                        type='email'
                        name='email'
                        inputtype='input'
                        label='מייל'
                        value={this.state.user.email}
                        onChange={this.handleChange('email')}
                        invalid={(!this.state.userValid.email.valid).toString()}
                        touched={this.state.userValid.email.touched.toString()}
                        errmessage={this.state.userValid.email.errmessage}
                    />
                    <Input
                        type='password'
                        name='password'
                        inputtype='input'
                        label='סיסמה'
                        value={this.state.user.password}
                        onChange={this.handleChange('password')}
                        invalid={(!this.state.userValid.password.valid).toString()}
                        touched={this.state.userValid.password.touched.toString()}
                        errmessage={this.state.userValid.password.errmessage}
                    />
  
                    <button onClick={this.handleClick} className={classes.button} style={{ position:'absolute',right:"630px"}}>התחבר</button>
                    <Link to='/Register'>
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


   
  

  

  
     

  
  