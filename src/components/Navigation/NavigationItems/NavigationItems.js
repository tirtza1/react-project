import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/'>גלריה</NavigationItem>
    <NavigationItem link='/Calendar'>לוח שנה</NavigationItem>
     <NavigationItem link='/AddConection'>אילן יוחסין</NavigationItem>
     <NavigationItem link='/LogIn'>התחברות</NavigationItem>
    {/*<NavigationItem link="/Logout">התנתק</NavigationItem>*/}
    
  </ul>
);
export default navigationItems;

/* {props.isAuthenticated ? <NavigationItem link="/AddConection">אילן יוחסין</NavigationItem> : null}
    {props.isAuthenticated ? <NavigationItem link="/Calender">לוח שנה</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/LogIn">התחברות</NavigationItem>
            : <NavigationItem link="/Logout">התנתק</NavigationItem>}
*/
    /*צריך לעשות פונקציה שתציג את ,'התנתק' רק אם המשתמש מחובר*/
