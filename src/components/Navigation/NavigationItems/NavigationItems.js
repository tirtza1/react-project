import React, { useState } from 'react';
import Home from '../../Home/home';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = (props) => {

  const [isSignedIn, setIsSignIn] = useState(false);

  if (isSignedIn) 
    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem link='/Photo'>גלריה</NavigationItem>
        <NavigationItem link='/Calendar'>לוח שנה</NavigationItem>
        <NavigationItem link='/Pedigree'>אילן יוחסין</NavigationItem>
        <NavigationItem link='/group:id'>בית</NavigationItem>
      {/*<NavigationItem link="/Logout">התנתק</NavigationItem>*/}
      </ul>
    );

  else return (
    {/* <ul className={classes.NavigationItems}>
      <NavigationItem link='/LogIn'>התחברות</NavigationItem>
      <NavigationItem link='/'>בית</NavigationItem> 
    </ul>*/}
    <Home><Home/>
  );
  
}
export default NavigationItems;

/* {props.isAuthenticated ? <NavigationItem link="/AddConection">אילן יוחסין</NavigationItem> : null}
    {props.isAuthenticated ? <NavigationItem link="/Calender">לוח שנה</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/LogIn">התחברות</NavigationItem>
            : <NavigationItem link="/Logout">התנתק</NavigationItem>}
*/
    /*צריך לעשות פונקציה שתציג את ,'התנתק' רק אם המשתמש מחובר*/
