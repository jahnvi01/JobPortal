import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route} from 'react-router-dom';
import Home from './components/home';
import './App.css';
import UserSignup from './components/auth/user-signup';
import AdminSignin from './components/admin/admin_signin';
import UpdateUser from './components/admin/updateUser';
import Dashboard from './components/admin/dashboard';
import Companies from './components/admin/companies';
 import Interviewers from './components/admin/interviewers';
import updateCompany from './components/admin/updateCompany';
import CompanySignup from './components/auth/company-signup';
import Contact from './components/admin/contact';
import AdminJobs from './components/admin/jobs';
import Schedule from './components/admin/scheduleInterview';
import UserActive from './components/auth/user-active';
import CompanyActive from './components/auth/company-active';
import Signin from './components/auth/signin';
import Users from './components/users/users';
import ViewJob from './components/users/view-job';
import IntSignup from './components/auth/interviewer-signup';
import IntActive from './components/auth/interviewer-active';
import Company from './components/company/company';
import Team from './components/company/team';
import Interviewer from './components/interviewer/interviewer';
import Applicant from './components/interviewer/applicant'
import Account from './components/interviewer/account';
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
    <Route exact path="/admin/signin" component={AdminSignin} />
    <Route exact path="/admin/dashboard" component={Dashboard} />
    <Route exact path="/admin/users/:id" component={UpdateUser} />
    <Route exact path="/admin/companies" component={Companies} />
    <Route exact path="/admin/companies/:id" component={updateCompany} />
    <Route exact path="/admin/interviewers" component={Interviewers} />
    <Route exact path="/admin/schedule-interview/:id" component={Schedule} />
    <Route exact path="/admin/jobs" component={AdminJobs} />
    <Route exact path="/admin/contact/:id" component={Contact} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/view/:id" component={ViewJob} />
    <Route exact path="/company" component={Company} />
    <Route exact path="/jobs" component={Team} />
    <Route exact path="/interviewer" component={Interviewer} />
    <Route exact path="/details/:applicantId/:jobId" component={Applicant} />
    <Route exact path="/account/:id" component={Account} />
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