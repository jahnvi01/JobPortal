import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {isAuth,companyAuth} from '../../functions/auth';
import ShowAlert from '../../functions/alert';
class CandidateDetails extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
  interview:""

  };
  componentWillMount(){
  companyAuth(this.props);  
   var jobId=this.props.match.params.jobId; 
  var applicantId=this.props.match.params.applicantId;
  fetch('/api/company/candidate-details',{
    method: "post",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },body:JSON.stringify({jobId,applicantId})
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
    var jobSelection=1;
  }else{
    var jobSelection=0;
  }
  if(interviewDone){
var companyInterview=1;
  var jobId=this.props.match.params.jobId; 
  var applicantId=this.props.match.params.applicantId;
  fetch('/api/company/companyInterview',{
    method: "post",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },body:JSON.stringify({jobId,applicantId,companyInterview,jobSelection})
  })
  .then(res=>res.json())
  .then(res=>this.setState({message:res.message}))

  }
  else{
    this.setState({error:"InterviewShould be done before pressing submit"})
     
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
showSubmit=()=>{
    if(this.state.interview.companyInterview===0){
    return(
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
    )}
    else{
        if(this.state.interview.jobSelection===0){
            var job="Not Selected"
        }
        else{
            var job="Selected"
        }
        return(
            <div className="post-card">
        <div style={{display:"flex",alignItems:"center"}} >
        
        <p className="m-2 font-title">Interview Done:</p> 
        <p className="m-2 font-title">Yes</p>
        </div>
      
        <div style={{display:"flex",alignItems:"center"}} id="select" >
        
        <p className="m-2 font-title">Job:</p> 
        <p className="m-2 font-title">{job}</p>
        </div>
             </div> 
        )
        
    }

}
  showDetails=()=>{
  if(this.state.interview!==""){

    return(
        <div className="row m-5" >
      
        <div className="col-md-8 post-card">
        <div className="row profile-card">
  <div className="m-5 col-md-12" style={{alignItems:"center"}} >

        <p className="post-title">Applicant Details</p>
       
   
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
  <p className="font-title">{this.state.interview.applicant.email} ₹</p>
  </div>
  <div className="mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title">skills:</p> 
  {this.showSkills(this.state.interview.applicant.skills)}
  </div>
  <div className="mt-2" style={{display:"flex",alignItems:"center"}}>
  <p className="font-title">Achievements:</p> 
  <p className="font-title">{this.state.interview.applicant.achievements}</p>
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
          <ShowAlert error={this.state.error} message={this.state.message}/>
   {this.showSubmit()}
  </div>
  
  
  
  </div>
    )

    }
    else{
      return(
        <h3>No Details To Show</h3>
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
  


  
  export default withRouter(CandidateDetails);