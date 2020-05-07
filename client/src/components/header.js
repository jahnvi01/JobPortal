import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {isAuth,signout} from '../functions/auth';
class Header extends Component {
  
 setHeader=()=>{
   console.log(isAuth().role)
   if(isAuth() && isAuth().role===4){
   return(
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
    <Link className="navbar-brand" to="/">JobFinder</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link className="nav-link" to='/admin/dashboard'>Home <span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/companies">Companies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/interviewers">Interviewers</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/jobs">Jobs</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">Services</Link>
        </li>
       
          
        {!isAuth() &&(
       <li className="nav-item">
          <Link className="nav-link" to='/signin' style={{cursor:"pointer"}}>SignIn</Link>
          </li>)
}


        {isAuth() &&(
       <li className="nav-item">
          <Link className="nav-link" to='/' onClick={()=>signout(()=>this.props.history.push('/'))} style={{cursor:"pointer"}}>Signout</Link>
          </li>)
}


      </ul>

    </div>
  </nav>
   )
   }
   else{
    var home='/';
    if(isAuth()){
      if(isAuth().role===1){
        home='/users'
      }
      if(isAuth().role===2){
        home='/company'
      }
      if(isAuth().role===3){
        home='/interviewer'
      }
    }
     return(
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <Link className="navbar-brand" to="/">JobFinder</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={home}>Home <span className="sr-only">(current)</span></Link>
          </li>


          {isAuth() && isAuth().role===1 &&(
         <li className="nav-item">
            <Link className="nav-link" to='/profile' style={{cursor:"pointer"}}>Profile</Link>
            </li>)}
            {isAuth() && isAuth().role===2 &&(
         <li className="nav-item">
            <Link className="nav-link" to='/jobs' style={{cursor:"pointer"}}>Jobs</Link>
            </li>)}
            {isAuth() && isAuth().role===3 &&(
         <li className="nav-item">
            <Link className="nav-link" to={`/account/${isAuth()._id}`} style={{cursor:"pointer"}}>Account</Link>
            </li>)}
          <li className="nav-item">
            <Link className="nav-link" to="#">Why Us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">Contact</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">Services</Link>
          </li>
         
            
          {!isAuth() &&(
         <li className="nav-item">
            <Link className="nav-link" to='/signin' style={{cursor:"pointer"}}>SignIn</Link>
            </li>)
}


          {isAuth() &&(
         <li className="nav-item">
            <Link className="nav-link" to='/' onClick={()=>signout(()=>this.props.history.push('/'))} style={{cursor:"pointer"}}>Signout</Link>
            </li>)
}


        </ul>
  
      </div>
    </nav>
     )
   }
 }

  render() {

    return (
        <div>
       {this.setHeader()}
      </div>
    );
  }
}

export default withRouter(Header);