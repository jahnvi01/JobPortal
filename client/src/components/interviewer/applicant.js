import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import Header from '../header';
import {authentication,isAuth,interviewerAuth} from '../../functions/auth';

class Applicant extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
  interview:""

  };
  componentWillMount(){
  interviewerAuth(this.props);  
  var _id=isAuth()._id;

  var jobId=this.props.match.params.jobId; 
  var applicantId=this.props.match.params.applicantId;
  fetch('/api/interviewer/interviewDetails',{
    method: "post",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },body:JSON.stringify({_id,jobId,applicantId})
  })
  .then(res=>res.json())
  .then(res=>this.setState({interview:res[0]||""}))

  }
  showLocation=(location)=>{
    if(location){
        console.log(location)
 return  location.map(city=>{
        return (
        <p className="font" key={city}>{city}</p> 
        )
    })
}
}

showSkills=(skills)=>{
    if(skills){
      
 return  skills.map(skill=>{
        return (
        <p className="font" key={skill}>{skill}</p> 
        )
    })
}
}
showEducation=()=>{
    if(this.state.interview.applicant.education){
      
 return  this.state.interview.applicant.education.map(education=>{
        return (
         
              <tr  key={education._id}>
                <td> <p className="font-title">{education.name}</p> </td>
                <td> <p className="font-title">{education.startYear}</p> </td>
                <td>  <p className="font-title">{education.endYear}</p> </td>
            <td>  <p className="font-title">{education.course}</p></td>
              </tr>
          
        )
    })
}
}

showEmployment=()=>{
    if(this.state.interview.applicant.pastEmployment){
      
 return  this.state.interview.applicant.pastEmployment.map(employment=>{
        return (
         
              <tr  key={employment._id}>
                <td> <p className="font-title">{employment.companyName}</p> </td>
                <td> <p className="font-title">{employment.startYear}</p> </td>
                <td>  <p className="font-title">{employment.endYear}</p> </td>
            <td>  <p className="font-title">{employment.companyRole}</p></td>
              </tr>
          
        )
    })
}
}
handleSubmit=()=>{
  var interviewDone=document.getElementById("interview-done").checked;
  if(document.getElementById("selection").checked){
    var selection=1;
  }else{
    var selection=0;
  }
  if(interviewDone){
interviewDone=1;
var _id=isAuth()._id;
  var jobId=this.props.match.params.jobId; 
  var applicantId=this.props.match.params.applicantId;
  fetch('/api/interviewer/interviewDone',{
    method: "post",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },body:JSON.stringify({_id,jobId,applicantId,interviewDone,selection})
  })
  .then(res=>res.json())
  .then(res=>this.setState({message:res.message}))

  }
  else{
      alert("Interview should be done before submission");
  }
}
handleCheckbox=()=>{
    var interviewDone=document.getElementById("interview-done").checked;
    if(interviewDone===true){
    var P = document.createElement("P"); 
    P.innerHTML = "Selection in interview";   
    P.classList.add("font-title");
    P.classList.add("m-2"); 
    var input = document.createElement("INPUT"); 
    input.setAttribute('type', 'checkbox');    
    input.setAttribute('id', 'selection'); 
    var button = document.createElement("INPUT"); 
    button.setAttribute('type', 'submit');    
    button.setAttribute('id', 'selection'); 
    button.setAttribute('value', 'Submit');    
    button.classList.add("btn-success"); 
    button.classList.add("btn");   
    button.addEventListener("click", ()=>{this.handleSubmit()})       
    document.getElementById("select").appendChild(P);
    document.getElementById("select").appendChild(input);
    document.getElementById("submit").appendChild(button);
    } 
}
  showDetails=()=>{
  if(this.state.interview!==""){

    return(
        <div className="row" >
      
        <div className="col-md-8 post-card">
        <div className="row profile-card">
  <div className="m-3 col-md-12" style={{alignItems:"center"}} >
        <p className="post-title">{this.state.interview.job.jobrole}</p>
        <div style={{display:"flex",alignItems:"center"}}>
        <div style={{display:"flex"}}>
    <i className='far fa-building p-1' style={{fontSize:'20px',color:"#28a745"}}></i>
    <p className="font" style={{color:"#28a745"}}>{this.state.interview.job.company}</p>
    </div>
    <div style={{display:"flex",paddingLeft:"2%"}} >
    <i className="material-icons p-1" style={{fontSize:"20px",color:"gray"}}>pin_drop</i>
      {this.showLocation(this.state.interview.job.location)}
    </div>
  
  </div>
  <div className="mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title">Salary(Annual):</p> 
  <p className="font-title">{this.state.interview.job.salary} ₹</p>
  </div>
  <div className="mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title">Skills Required:</p> 
  {this.showSkills(this.state.interview.job.skills)}
  </div>
  
  <div className="col-md-12" style={{alignItems:"center"}} >
        <p className="post-title">Applicant Details</p>
       
    </div>
    <div className="mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title">Fullname: </p> 
  <p className="font-title">{this.state.interview.applicant.fullname} </p>
  </div>
  <div className="mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title">Contact:</p> 
  <p className="font-title">{this.state.interview.applicant.contact} </p>
  </div>
  <div className="mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title">Email:</p> 
  <p className="font-title">{this.state.interview.applicant.email}</p>
  </div>
  <div className="mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title">skills:</p> 
  {this.showSkills(this.state.interview.applicant.skills)}
  </div>
  <div className="mt-2" style={{alignItems:"center"}}>
  <p className="font-title">Achievements:</p> 
  <p style={{color:"gray"}}>{this.state.interview.applicant.achievements}</p>
  </div>
  <div className="mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title">Years Of Experience:</p> 
  <p className="font-title">{this.state.interview.applicant.yearsOfExperience}</p>
  </div>
  <div  style={{display:"flex",alignItems:"center"}}>
  <table className="table" style={{width:"80%"}}>
            <thead>
              <tr>
                <th>Institute</th>
                <th>startYear</th>
                <th>endYear</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>

{this.showEducation()}
</tbody>
          </table>
  </div>

  <div style={{display:"flex",alignItems:"center"}}>
  <table className="table" style={{width:"80%"}}>
            <thead>
              <tr>
                <th>Company</th>
                <th>startYear</th>
                <th>endYear</th>
                <th>Job-role</th>
              </tr>
            </thead>
            <tbody>

{this.showEmployment()}
</tbody>
          </table>
  </div>
  </div>
 
  
  </div>
  
  
          </div>
          <div className="col-md-4">
          <div className="post-card">
  <div style={{display:"flex",alignItems:"center"}} >
  
  <p className="m-2 font-title">Interview Done:</p> 
  <input type="checkbox" id="interview-done" onClick={()=>{this.handleCheckbox()}} />
  </div>

  <div style={{display:"flex",alignItems:"center"}} id="select" >
  

  </div>
  <div style={{display:"flex",alignItems:"center"}} id="submit" >
  

  </div>
  </div> 
  </div>
  
  
  
  </div>
    )

    }
    else{
      return(
        <h3>No interviews To Show</h3>
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
      
      <div className="col-md-6 offset-3" id="backgroundText" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>Interview Details</h2>
        </div>
          </div>
          <div className="container">
  
  {this.showDetails()}

   </div>
        </div>
      );
    }
  }
  


  
  export default withRouter(Applicant);