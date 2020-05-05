import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import Header from '../header';
import {authentication,isAuth,interviewerAuth} from '../../functions/auth';

class Interviewer extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    token:"",
    user:"",

  };
  componentWillMount(){
  interviewerAuth(this.props);   
  
  }

  render() {
     
      return (
        <div>

<div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>Interviewer Dashboard</h2>
        </div>
          </div>
        
        </div>
      );
    }
  }
  


  
  export default withRouter(Interviewer);