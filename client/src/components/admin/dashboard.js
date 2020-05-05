import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
// import {isAuth,adminAuth} from '../../functions/auth';

class Team extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,

  
  };
  componentWillMount(){
    // companyAuth(this.props); 
    //  var company=isAuth().company 
    // fetch('/api/interviewer/team',{
    //     method: "post",
    //     headers: {
    //       'Accept': 'application/json, text/plain, */*',
    //       'Content-Type': 'application/json'
    //     },body:JSON.stringify({company})
    //   })
    //   .then(res=>res.json())
    //   .then(res=>this.setState({interviewers:res}))
  }


  render() {
      return (
        <div>
<div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>Contact Interviewers</h2>
        </div>
          </div>
          <div className="container">
  
  {this.showTeam()}

   </div>
        </div>
    
      );
    }
  }
  


  
  export default withRouter(Team);