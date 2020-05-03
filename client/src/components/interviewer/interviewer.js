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
          
        
    Interviewer
        
        </div>
      );
    }
  }
  


  
  export default withRouter(Interviewer);