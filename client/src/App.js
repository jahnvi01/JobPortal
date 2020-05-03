import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route} from 'react-router-dom';
import Home from './components/home';
import './App.css';
import UserSignup from './components/auth/user-signup';
import CompanySignup from './components/auth/company-signup';
import UserActive from './components/auth/user-active';
import CompanyActive from './components/auth/company-active';
import Signin from './components/auth/signin';
import Users from './components/users/users';
import IntSignup from './components/auth/interviewer-signup';
import IntActive from './components/auth/interviewer-active';
import Company from './components/company/company';
import Interviewer from './components/interviewer/interviewer';
import Header from './components/header';
import Profile from './components/users/profile';
import 'bootstrap/dist/css/bootstrap.css';
class App extends Component {
  render() {
    return (

    <div className="App">
<Header />
    <Switch>  
     <div className="bg-light">   
    <Route exact path="/" component={Home} />
    <Route exact path="/user-signup" component={UserSignup} />
    <Route exact path="/company-signup" component={CompanySignup} />
    <Route exact path="/interviewer-signup" component={IntSignup} />
    <Route exact path="/users" component={Users} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/company" component={Company} />
    <Route exact path="/interviewer" component={Interviewer} />
    <Route exact path="/signin" component={Signin} />
    <Route exact path="/user-signup/:token" component={UserActive} />
    <Route exact path="/company-signup/:token" component={CompanyActive} />
    <Route exact path="/interviewer-signup/:token" component={IntActive} />
    </div>
    </Switch > 


      </div>
    );
  }
}

export default App;