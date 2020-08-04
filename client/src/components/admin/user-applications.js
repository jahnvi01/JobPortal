import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {adminAuth} from '../../functions/auth';
import ShowAlert from '../../functions/alert';
class Applications extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    jobs:"",
    interviews:[]
  
  };
  componentWillMount(){
    adminAuth(this.props); 
    var _id=this.props.match.params.id;
    fetch('/api/admin/applications',{
        method: "post",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },body:JSON.stringify({_id})
      })
      .then(res=>res.json())
      .then(res=>{this.setState({jobs:res.data.applications||[],interviews:res.interview||[],error:res.error||""})
      
    
    })
  }

handleSubmit=(jobId)=>{
    var applicantId=this.props.match.params.id;
    var email=document.getElementById("email").value;
    if(!email){
      this.setState({error:"Enter Email"})
    }
    else{

    
    var post={
        email:email,
        jobId:jobId,
        applicantId:applicantId
    }
    fetch('/api/admin/schedule-interview',{
        method: "post",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },body:JSON.stringify(post)
      })
      .then(res=>res.json())
      .then(res=>{this.setState({message:res.message,error:res.error||""})
      if(res.message==="Successfully Assigned"){
       window.location.reload()
      }

    })
}}
  showjobs=()=>{
    var userId=this.props.match.params.id;
    if(this.state.jobs){
      
  var jobs=this.state.jobs.map(job=>{
    console.log(this.state)
var email="";
var timings="";
var match=0;
this.state.interviews.map(interview=>{
    if (interview.job===job._id){
email=interview.interviewer.email;
timings=interview.interviewer.timings;
match=1;
    }
})

    return(
      <div className="row job-details" key={job._id}>
   <div className="col-md-2">
   <i className='fas fa-house-user' style={{fontSize:'36px',color:"gray",background:"lightgray",padding:"5%"}}></i>
   </div>
   <div className="col-md-3 post-font" style={{color:"black"}}>
    <h4>{job.company}</h4>
    <div style={{display:"flex"}}>
    
    <h5 className="post-font p-1" style={{fontSize:"18px"}}>{job.jobrole}</h5>
       </div>
       <div className="post-font" style={{display:"flex"}}>

    <h5>{job.salary}₹</h5>
    </div>
   </div>
  
  {match===0 && ( <div className="col-md-3 post-font">
    <input type="email" placeholder="Interviewer's Email" id="email"  />
    </div>
     ) }
  {match===0 && (<div className="col-md-3 post-font">
   <button type="button" onClick={()=>this.handleSubmit(job._id)} className="btn btn-outline-success">Assign</button>

     </div>
     ) }

{match===1 && ( <div className="col-md-3 post-font">
   <h5>Interviewer</h5>
    <h5>{email}</h5>
    </div>
     ) }
  {match===1 && (<div className="col-md-3 post-font">
  <h5>Timings</h5>
    <h5>{timings}</h5>
     </div>
     ) }
<div className="col-md-1">
{match===1 && (<Link to={`/admin/interview-status/${userId}/${job._id}`}>
   <button type="button" className="btn btn-outline-success">Status</button>
  </Link>)}
     </div>
 
    </div>
    )
  
  })
  return jobs;
    }
    else{
      return(
        <h3 className="m-5">No Applications To Show</h3>
      )
    }
  }
  
  removeAlert=()=>{
    if(this.state.message || this.state.error) {
      setTimeout(()=>{ this.setState({error:"",message:""}) }, 3000);
    }
   }
    render() {
    this.removeAlert()
     
      return (
        <div>
<div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>View Applications</h2>
        </div>
          </div>
          <div className="container">
          <ShowAlert error={this.state.error} message={this.state.message}/>
  {this.showjobs()}

   </div>
        </div>
    
      );
    }
  }
  


  
  export default withRouter(Applications);