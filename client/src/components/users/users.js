import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import Header from '../header';
import {authentication,isAuth,userAuth} from '../../functions/auth';

class Users extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    token:"",
    user:"",

  };
  componentWillMount(){
    userAuth(this.props);   
  
  }

  render() {
     
      return (
        <div>
          
        
    users
        
        </div>
      );
    }
  }
  


  
  export default withRouter(Users);