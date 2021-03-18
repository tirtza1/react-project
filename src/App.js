import React, { Component } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import LogIn from './containers/Entrance/LogIn/LogIn';
//import Logout from './containers/Entrance/Logout/Logout';
import Photo from './components/Photo/Photo';
import SignUp from './containers/Entrance/SignUp/SignUp';
import Layout from './components/Layout/Layout';
import ForgetPassword from './containers/Entrance/LogIn/ForgetPassword/ForgetPassword';
import Pedigree from './containers/FamilyTree/Pedigree';
import Calendar from './components/Calendar/Calendar'
import Pictures from './components/Pictures/pictures'

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
                <Route path='/Pedigree'  exact component={Pedigree}/>
                <Route path='/Calendar'  exact component={Calendar}/>
                <Route path='/Photo'  exact component={Photo}/>
                <Route path='/pictures' exact component={Pictures}/>
              </Switch>
            </Layout>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;


/**/