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
  interviews:[]

  };
  componentWillMount(){
  interviewerAuth(this.props);  
  var _id=isAuth()._id; 
  fetch('/api/interviewer/interviews',{
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
    if(this.state.interviews && this.state.interviews.length!==0){
      console.log("err")
  var interviews=this.state.interviews.map(interview=>{
    if(interview.interviewDone===0){
    return(
      <div className="row job-details" key={interview._id}>
   <div className="col-md-3">
   <h5 className="post-font p-1">{interview.applicant.fullname}</h5>
   <h5 className="post-font p-1">{interview.applicant.email}</h5>
   </div>
   <div className="col-md-3">
    <h4 className="post-font p-1">{interview.job.company}</h4>
    <h4 className="post-font p-1">{interview.job.jobrole}</h4>
   
   </div>
   <div className="col-md-3 post-font">
    <h5>{interview.timings}₹</h5>
     </div>
   {/* <div className="col-md-2">
 <div style={{display:"flex",alignItems:"center"}}>
   <p style={{margin:"0"}}>InterviewDone</p>
   <input style={{margin:"3%"}} type="checkbox" />
 </div>
 <div style={{display:"flex"}}>
   <p style={{margin:"0"}}>Selected</p>
   <input style={{margin:"3%"}} type="checkbox" />
 </div>
     </div> */}
     <div className="col-md-3 post-font">
     <Link to={`/details/${interview.applicant._id}/${interview.job._id}`}>
   <button type="button" className="btn btn-outline-success">Visit</button>
  </Link>
     </div>
    </div>
    )}
  
  })
  return interviews;
    }
    else{
      return(
        <h3>No interviews To Show</h3>
      )
    }
  }


  render() {
     console.log(this.state.interviews)
      return (
        <div>

<div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" id="backgroundText" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>Interviewer Dashboard</h2>
        </div>
          </div>
          <div className="container">
  
  {this.showinterviews()}

   </div>
        </div>
      );
    }
  }
  


  
  export default withRouter(Interviewer);