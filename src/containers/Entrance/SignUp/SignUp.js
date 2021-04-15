import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './SignUp.module.css';


//nimport checkValidity from '../../SignUp/checkValidity/checkValidity'
class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            firstname:'',
            lastname:'',
            ID:'',
            birthdate:'',
            email: '',
            password: '',
            showNewGroup: false,
            showOldGroup: false,
            groupName: '',
            groupId: ''
        }
        this.onSelectChange = this.onSelectChange.bind(this);
    }

   
    handleChange = (input) => (e) => {
        e.preventDefault();
        this.setState({ [input]: e.target.value });
      };

    onSelectChange = (event) => {
        if (event.target.value === 'צור קבוצה חדשה') {
            this.setState({showNewGroup: true})
            this.setState({showOldGroup: false})
        }
        if (event.target.value === 'הצטרף לקבוצה קיימת') {
            this.setState({showNewGroup: false})
            this.setState({showOldGroup: true})
        }
    }

    nameChange = (event) => {
        this.setState({groupName: event.target.value})
    }

    codeChange = (event) => {
        this.setState({groupId: event.target.value})
    }



    onSubmit = () => {
        fetch('http://localhost:3003/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName: this.state.firstname.value,
                lastName: this.state.lastname.value,
                id: this.state.ID.value,
                birthday: this.state.birthdate.value,
                email: this.state.email.value,
                password: this.state.password.value,
                groupId: parseInt(this.state.groupId),
                groupName: this.state.groupName
            })
        })
        .then(response => response.text())
        .then(data => {
            window.alert(data)
            //redirect to home page
            //make the signin state
        })
    }
    
    render () {
        return (
            <div >
                <form onSubmit={this.handleSubmit} className={classes.SignUp}>
               
                    <label className={classes.LableLogin} name='first-name'>:שם פרטי</label><br/>
                    <input
                        className={classes.InputLogin}
                        type='text'
                        name='first-name'
                        value={this.state.firstname}
                        onChange={this.handleChange('firstname')}
                    />
                    <br />
                    <label className={classes.LableLogin} htmlFor='last-name'>
                        :שם משפחה
                    </label>
                    <br/>
                    <input
                        className={classes.InputLogin}
                        type='text'
                        name='lasr-name'
                        value={this.state.lastname}
                        onChange={this.handleChange('lastname')}
                    />
                    <br />

                    <label className={classes.LableLogin} htmlFor='id'>
                       :תעודת זהות
                    </label>
                    <br/>
                    <input
                        className={classes.InputLogin}
                        type='text'
                        name='id'
                        value={this.state.ID}
                        onChange={this.handleChange('ID')}
                    />

                    <br />

                    <label className={classes.LableLogin} htmlFor='birthdate'>
                        :תאריך לידה
                    </label>
                    <input
                        className={classes.InputLogin}
                        type='date'
                        name='birthdate'
                        value={this.state.birthdate}
                        onChange={this.handleChange('birthdate')}
                    />
                    <br />

                    <label className={classes.LableLogin} htmlFor='email'>
                        :מייל
                    </label>
                    <br/>
                    <input
                        className={classes.InputLogin}
                        type='email'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                    />
                    <br />
                    <label className={classes.LableLogin} htmlFor='password'>
                        :סיסמא
                    </label>
                    <br/>
                    <input
                        className={classes.InputLogin}
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                    />
                    <br />
                    <br />
                    <select onChange={this.onSelectChange} className={classes.select}>
                        <option disabled selected>בחר: </option>
                        <option id="new">צור קבוצה חדשה</option>
                        <option id="old">הצטרף לקבוצה קיימת</option>
                    </select>
                    <br/>
                    {
                        this.state.showNewGroup ?
                        <div>
                            <br/>
                            <lable  className={classes.LableLogin}>:שם הקבוצה </lable>
                            <input onChange={this.nameChange}   className={classes.InputLogin}/>
                         
                        </div> 
                        : null
                    }
                    {
                        this.state.showOldGroup ?
                        <div>
                             <br/>
                            <lable className={classes.LableLogin}>:קוד הקבוצה (נשלח במייל) </lable>
                            <input onChange={this.codeChange} className={classes.InputLogin}/>
                        </div> 
                        : null
                    }
                    <br/>
                    <button className={classes.button} >הירשם</button>
                </form>
            </div>
        );
    }
}


export default SignUp;