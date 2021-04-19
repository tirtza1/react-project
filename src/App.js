import React, { Component } from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import LogIn from './containers/Entrance/LogIn/LogIn'
import Photo from './components/Photo/Photo'
import Register from './containers/Entrance/Register/register'
import Layout from './components/Layout/Layout'
import FamilyTree from './containers/FamilyTree/FamilyTree'
import Calendar from './components/Calendar/Calendar'
import Home from './components/Home/home'
import HomeGroup from './components/GroupHome/groupHome'

class App extends Component {
  constructor() {
    super();
    this.state = {
      groupId: null,
      isSignIn: false,
    }
    this.setSignIn = this.setState.bind(this);
    this.setGroupId = this.setGroupId.bind(this);
  }

  setSignIn() {
    this.setState({isSignIn: true});
  }

  setGroupId(id) {
    this.setState({groupId: id})
  }

  render() {
    return (
      <div> 
        <BrowserRouter>
        
          <Layout>
              <Switch>
                <Route path='/LogIn' exact>
                  <LogIn 
                    setSignIn={this.setSignIn}
                    setGroupId={this.setGroupId}
                  />
                </Route>
                <Route path='/Register' exact>
                  <Register 
                    setSignIn={this.setSignIn}
                    setGroupId={this.setGroupId}
                  />
                </Route>
                <Route path='/Pedigree' exact>
                  <FamilyTree groupId={this.state.groupId} />
                </Route>
                <Route path='/Calendar' exact >
                  <Calendar groupId={this.state.groupId} />
                </Route>
                <Route path='/Photo' exact >
                  <Photo groupId={this.state.groupId} />
                </Route>
                <Route path='/group/:id'>
                  <HomeGroup groupId={this.state.groupId}/>
                </Route>
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