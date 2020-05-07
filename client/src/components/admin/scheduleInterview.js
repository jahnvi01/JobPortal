import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {isAuth,adminAuth} from '../../functions/auth';

class Schedule extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    users:"",
    interviews:[]
  
  };
  componentWillMount(){
    adminAuth(this.props); 
    var _id=this.props.match.params.id;
    fetch('/api/admin/applicants',{
        method: "post",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },body:JSON.stringify({_id})
      })
      .then(res=>res.json())
      .then(res=>{this.setState({users:res.data.applications,interviews:res.interview||[]})
      
    
    })
  }

handleSubmit=(applicantId)=>{
    var jobId=this.props.match.params.id;
    var email=document.getElementById("email").value;
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
      .then(res=>console.log(res))
}
  showUsers=()=>{
    if(this.state.users){
      
  var users=this.state.users.map(user=>{
    console.log(this.state)
var email="";
var timings="";
var match=0;
this.state.interviews.map(interview=>{
    if (interview.applicant===user._id){
email=interview.interviewer.email;
timings=interview.interviewer.timings;
match=1;
    }
})

    return(
      <div className="row job-details" key={user._id}>
   <div className="col-md-2">
   <i className='fas fa-house-user' style={{fontSize:'36px',color:"gray",background:"lightgray",padding:"5%"}}></i>
   </div>
   <div className="col-md-4 post-font" style={{color:"black"}}>
    <h4>{user.fullname}</h4>
    <div style={{display:"flex"}}>
    <i className='far fa-address-card p-1' style={{fontSize:'18px',color:"gray"}}></i>
    <h5 className="post-font p-1" style={{fontSize:"18px"}}>{user.email}</h5>
       </div>
       <div className="post-font" style={{display:"flex"}}>
   <i className='fas fa-phone p-1' style={{fontSize:'20px',color:"gray"}}></i>
    <h5>{user.contact}</h5>
    </div>
   </div>
  
  {match===0 && ( <div className="col-md-3 post-font">
    <input type="email" placeholder="Interviewer's Email" id="email"  />
    </div>
     ) }
  {match===0 && (<div className="col-md-3 post-font">
   <button type="button" onClick={()=>this.handleSubmit(user._id)} className="btn btn-outline-primary">Assign</button>

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

 
    </div>
    )
  
  })
  return users;
    }
    else{
      return(
        <h3 className="m-5">No Applicants To Show</h3>
      )
    }
  }
  
  render() {
     
      return (
        <div>
<div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>View Applicants</h2>
        </div>
          </div>
          <div className="container">
  
  {this.showUsers()}

   </div>
        </div>
    
      );
    }
  }
  


  
  export default withRouter(Schedule);