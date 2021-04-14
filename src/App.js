import React, { Component } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import LogIn from './containers/Entrance/LogIn/LogIn';
//import Logout from './containers/Entrance/Logout/Logout';
import Photo from './components/Photo/Photo';
import SignUp from './containers/Entrance/SignUp/SignUp';
import Layout from './components/Layout/Layout';
import ForgetPassword from './containers/Entrance/LogIn/ForgetPassword/ForgetPassword';
//import Pedigree from './containers/FamilyTree/Pedigree';
import FamilyTree from './containers/FamilyTree/FamilyTree';
import Calendar from './components/Calendar/Calendar'
import Pictures from './components/Pictures/pictures'
import Home from './components/Home/home';
import HomeGroup from './components/GroupHome/groupHome'

class App extends Component {
  render() {
    return (
      <div> 
        <BrowserRouter>
        
          <Layout>
              <Switch>
                <Route path='/LogIn' exact component={LogIn}/>
                <Route path='/SignUp'  exact component={SignUp}/>
                {/*<Route path='/Logout' exact component={Logout} />*/}
                <Route path='/ForgetPassword'  exact component={ForgetPassword}/>
                <Route path='/Pedigree'  exact component={FamilyTree}/>
                <Route path='/Calendar'  exact component={Calendar}/>
                <Route path='/Photo'  exact component={Photo}/>
                <Route path='/pictures' exact component={Pictures}/>
                <Route path='/group:id' component={HomeGroup}/>
                <Route path='/' exact component={Home}/>
              </Switch>
            </Layout>

        </BrowserRouter>
      </div>
    );
  }
}
export default App;


/**/