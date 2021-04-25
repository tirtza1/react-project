import React, { useState } from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'
import Swal from 'sweetalert2'
const NavigationItems = (props) => {
  const { handleUserOut } = props;
 const handleClick=()=>{
    Swal.fire({
      title: '?האם הנך רוצה לצאת',
      confirmButtonColor: '#ef9c83',
      confirmButtonText: 'התנתק',
      showCancelButton: true,
      cancelButtonText: 'ביטול',
      reverseButtons: true
  }).then((clicked) => {
    if (clicked.isConfirmed){
        handleUserOut();
    }
  })
}

  if (props.isSignIn) {
    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem link='/Photo'>גלריה</NavigationItem>
        <NavigationItem link='/Calendar'>לוח שנה</NavigationItem>
        <NavigationItem link='/Pedigree'>אילן יוחסין</NavigationItem>
        <NavigationItem link={`/group/${props.groupId}`}>בית</NavigationItem>
        <NavigationItem onClick={handleClick}>התנתק</NavigationItem>

      </ul>
    );
  }
  else return null;
}
export default NavigationItems;
