import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route} from 'react-router-dom';
import Home from './components/home';
import './App.css';
import UserSignup from './components/auth/user-signup';
import 'bootstrap/dist/css/bootstrap.css';
class App extends Component {
  render() {
    return (

      <div className="App">

    <Switch>  
        
    <Route exact path="/" component={Home} />
    <Route exact path="/user-signup" component={UserSignup} />
    <Route exact path="/user-signup/:token" component={UserSignup} />
    </Switch > 


      </div>
    );
  }
}

export default App;