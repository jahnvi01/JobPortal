import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import Header from '../header';
import {authentication,isAuth,companyAuth} from '../../functions/auth';

class Company extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    token:"",
    user:"",

  };
  componentWillMount(){
    companyAuth(this.props);   
  
  }

  render() {
     
      return (
        <div>
          
        
    Company
        
        </div>
      );
    }
  }
  


  
  export default withRouter(Company);