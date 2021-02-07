import React, {Component} from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component{
    
    state = {
        showSideDrawer: false,
      };
    
      sideDrawerClosedhandler = () => {
        this.setState({ showSideDrawer: false });
      };
      sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
          return { showSideDrawer: !prevState.showSideDrawer };
        });
      };
      render(){
            return( 
                <React.Fragment>
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                    <SideDrawer
                    closed={this.sideDrawerClosedhandler}
                    show={this.state.showSideDrawer}
                    />
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
                </React.Fragment>)
      }
        
      
   
}
export default Layout;