import React, { Component } from 'react';
import {withRouter } from 'react-router-dom';
import {adminAuth} from '../../functions/auth';
import ShowAlert from '../../functions/alert';
class Status extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
  interview:"",
  credits:0

  };
  componentWillMount(){
  adminAuth(this.props);  
 
  var jobId=this.props.match.params.jobId; 
  var applicantId=this.props.match.params.applicantId;
  fetch('/api/admin/interviewStatus',{
    method: "post",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },body:JSON.stringify({jobId,applicantId})
  })
  .then(res=>res.json())
  .then(res=>this.setState({interview:res[0]||"",credits:res[0].credits,error:res.error||""}))

  }


credit=()=>{
    var credits=document.getElementById("amount").value; 
    var interviewer=this.state.interview.interviewer._id;
    var jobId=this.props.match.params.jobId; 
    var applicantId=this.props.match.params.applicantId;
    const data={
        credits:credits,
        interviewer:interviewer,
        applicant:applicantId,
        job:jobId

    }    
    fetch('/api/admin/credits',{
        method: "post",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },body:JSON.stringify(data)
      })
      .then(res=>res.json())
      .then(res=>{this.setState({message:res.message,credits:credits})})

}

  showDetails=()=>{
  if(this.state.interview!==""){

    return(
        <div className="row m-5" >
      
        <div className="col-md-8 post-card">
        <div className="row profile-card">
  
  <div className="col-md-12" style={{alignItems:"center"}} >
        <p className="post-title">Interview Details</p>
       
    </div>
    <div className="col-md-12 mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title m-1">Fullname: </p> 
  <p className="font-title m-1">{this.state.interview.interviewer.fullname} </p>
  </div>
  <div className="col-md-12 mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title mt-1">Contact:</p> 
  <p className="font-title mt-1">{this.state.interview.interviewer.contact} </p>
  </div>
  <div className="col-md-12 mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title mt-1">Email:</p> 
  <p className="font-title mt-1">{this.state.interview.interviewer.email}</p>
  </div>
  
  <div className="col-md-12 mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title mt-1">Timings:</p> 
  <p className="font-title mt-1">{this.state.interview.timings}</p>
  </div>

  <div className="col-md-12 mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title mt-1">Initial Interview:</p> 
 {this.state.interview.interviewDone===0 && ( <p className="font-title mt-1">Not Done</p>)}
 {this.state.interview.interviewDone===1 && ( <p className="font-title mt-1">Done</p>)}
  </div>


 {this.state.interview.interviewDone===1 && this.state.interview.selected===0 &&(  <div className="col-md-12 mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title mt-1">Initial Interview:</p>  <p className="font-title mt-1">Not Selected</p> </div>)}
  
  {this.state.interview.interviewDone===1 && this.state.interview.selected===1 && (  <div className="col-md-12 mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title mt-1">Initial Interview:</p>  <p className="font-title mt-1">Selected</p> </div>)}
  
  <div className="col-md-12 mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title mt-1">Company Interview:</p> 
 {this.state.interview.companyInterview===0 && ( <p className="font-title mt-1">Not Done</p>)}
  </div>


 {this.state.interview.companyInterview===1 && this.state.interview.jobSelection===0 &&(  <div className="col-md-12 mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title mt-1">Company Interview Selection:</p>  <p className="font-title mt-1">No</p> </div>)}
  
  {this.state.interview.companyInterview===1 && this.state.interview.jobSelection===1 && (  <div className="col-md-12 mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title mt-1">Company Interview Selection:</p>  <p className="font-title mt-1">Yes</p> </div>)}
  
  </div>
 
  
  </div>
  
  <div className="col-md-4 post-card">

  <div className="row profile-card">
  
    <div className="col-md-12 mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title m-1">Credit To Interviewer: </p> 
  <p className="font-title m-1">{this.state.credits} </p>
  </div> 
  <div className="col-md-12 mt-2" style={{display:"flex",alignItems:"center"}}>
  <input type="number" id="amount" placeholder="Enter credits"/>
 </div>
  <div className="col-md-12 mt-2" style={{display:"flex",alignItems:"center"}}>
 <button id="credit" className="btn btn-primary m-3" onClick={()=>{this.credit()}}>Credit</button>
  </div>
  <ShowAlert error={this.state.error} message={this.state.message}/>
  </div>
  </div>
          </div>
        
  

    )

    }
    else{
      return(
        <h3>Nothing To Show</h3>
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
     console.log(this.state.interview)
      return (
        <div>

<div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>Interview Status</h2>
        </div>
          </div>
          <div className="container">
  
  {this.showDetails()}

   </div>
        </div>
      );
    }
  }
  


  
  export default withRouter(Status);