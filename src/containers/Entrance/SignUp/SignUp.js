import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './SignUp.module.css';
//nimport checkValidity from '../../SignUp/checkValidity/checkValidity'
class SignUp extends Component {
    state = {
        controls: {
            firstname:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'שם פרטי'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
           lastname:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'שם משפחה'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
           ID:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'תעודת זהות'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 9,
                    maxLength: 9
                },
                valid: false,
                touched: false
            },
            birthdate:{
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder:'תאריך לידה'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'אימייל'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'סיסמא'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
    
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
    
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
    
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
    
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
    
        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    onSubmit = () => {
        fetch('http://localhost:3003/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName: this.state.controls.firstname.value,
                lastName: this.state.controls.lastname.value,
                id: this.state.controls.ID.value,
                birthday: this.state.controls.birthdate.value,
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
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }
         
      
        const form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
               
        ) );

        return (
            <div className={classes.SignUp}>
                <form>
                    {form}
                    <Button btnType="Success" clicked={this.onSubmit}>הירשם</Button>
                </form>
            </div>
        );
    }
}


export default SignUp;