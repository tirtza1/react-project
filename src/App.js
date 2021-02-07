import React, { Component } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import LogIn from './containers/Entrance/LogIn/LogIn';
//import Logout from './containers/Entrance/Logout/Logout';
import SignUp from './containers/Entrance/SignUp/SignUp';
import Layout from './components/Layout/Layout';
import ForgetPassword from './containers/Entrance/LogIn/ForgetPassword/ForgetPassword';
import AddConection from './containers/FamilyTree/AddConection/AddConection';
import Calendar from './components/Calendar/Calendar'

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
                <Route path='/AddConection'  exact component={AddConection}/>
                <Route path='/Calendar'  exact component={Calendar}/>
              </Switch>
            </Layout>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;


/**/