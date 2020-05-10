import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {isAuth,companyAuth} from '../../functions/auth';

class Candidates extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
  interviews:[]

  };
  componentWillMount(){
  companyAuth(this.props);  
  var _id=this.props.match.params.id;  
  fetch('/api/company/candidates',{
    method: "post",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },body:JSON.stringify({_id})
  })
  .then(res=>res.json())
  .then(res=>this.setState({interviews:res||[]}))

  }


  showinterviews=()=>{
    if(this.state.interviews){
  var interviews=this.state.interviews.map(interview=>{
 
    return(
      <div className="row job-details" key={interview.applicant._id}>
           <div className="col-md-2">
   <i className='fas fa-house-user' style={{fontSize:'36px',color:"gray",background:"lightgray",padding:"5%"}}></i>
   </div>
   <div className="col-md-4">
   <h5 className="post-font p-1">{interview.applicant.fullname}</h5>
   <h5 className="post-font p-1">{interview.applicant.email}</h5>
   </div>
   <div className="col-md-4">
   <h5 className="post-font p-1">Contact</h5>
    <h4 className="post-font p-1">{interview.applicant.contact}</h4>
      
   </div>
      <div className="col-md-2 post-font">
     <Link to={`/candidate-details/${interview.applicant._id}/${interview.job._id}`}>
   <button type="button" className="btn btn-outline-primary">Visit</button>
  </Link>
     </div>
    </div>
    )
  
  })
  return interviews;
    }
    else{
      return(
        <h3>No Candidates To Show</h3>
      )
    }
  }


  render() {
     console.log(this.state.interviews)
      return (
        <div>

<div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>View Candidates</h2>
        </div>
          </div>
          <div className="container">
  
  {this.showinterviews()}

   </div>
        </div>
      );
    }
  }
  


  
  export default withRouter(Candidates);