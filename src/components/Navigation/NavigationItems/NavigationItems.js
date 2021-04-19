import React, { useState } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = (props) => {

  if (props.isSignedIn) 
    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem link='/Photo'>גלריה</NavigationItem>
        <NavigationItem link='/Calendar'>לוח שנה</NavigationItem>
        <NavigationItem link='/Pedigree'>אילן יוחסין</NavigationItem>
        <NavigationItem link='/group/:id'>בית</NavigationItem>
      </ul>
    );
  else return null;
}
export default NavigationItems;
