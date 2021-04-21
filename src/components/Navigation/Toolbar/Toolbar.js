import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggler from '../SideDrawer/DrawerToggler/DrawerToggler'

const toolbar=(props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggler clicked={props.drawerToggleClicked} />
        
        <nav className={classes.DesktopOnly}>
            <NavigationItems 
                isAuthenticated={props.isAuth} 
                isSignIn={props.isSignIn}
                groupId={props.groupId}
            />
        </nav>
    </header>
);
export default  toolbar;