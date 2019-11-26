import React from 'react';

import './App.css';

import Login from './Auth/Login'
import SignUp from './Auth/Signup'
import Home from './Home/Home'
import Account from './Account/Account'
import { Route,
    
    BrowserRouter as Router , 
    Switch} from 'react-router-dom'


import Welcome from './Component/ShowPost';
import ProfileInfo from './Profile/ProfileInfo';
import Profile from './Profile/Profile'
import Chat from './Chat/chat';



function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path = "/login" component={Login}/>
      <Route  path="/signup" component={SignUp} />
      <Route path='/account' component ={Account}/>
      <Route path="/showpost/:id/:id2" component={Welcome}/>
      <Route path='/profile' component={Profile} />
      <Route path='/profileinfo' component={ProfileInfo}/>
      <Route path='/chat' component ={Chat}/>
    </Switch>
  </Router>
  );
}

export default App;
