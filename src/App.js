import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import LogIn from './pages/LogIn/LogIn'
import Photo from './pages/Photo/Photo'
import Register from './pages/Register/register'
import Layout from './components/Layout/Layout'
import FamilyTree from './pages/FamilyTree/FamilyTree'
import Calendar from './pages/Calendar/Calendar'
import Home from './pages/Home/home'
import HomeGroup from './pages/GroupHome/groupHome'

class App extends Component {
  constructor() {
    super();
    this.state = {
      groupId: null,
      isSignIn: false,
    }
    this.setSignIn = this.setSignIn.bind(this);
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
          <Layout isSignIn={this.state.isSignIn} groupId={this.state.groupId}>
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