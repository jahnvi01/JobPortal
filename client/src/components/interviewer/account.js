import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {isAuth,interviewerAuth} from '../../functions/auth';
import ShowAlert from '../../functions/alert';
class Account extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    token:"",
    user:"",
    interviews:[]

  };
interviews=()=>{
    var _id=isAuth()._id; 
    console.log(_id)
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
  componentWillMount(){
  interviewerAuth(this.props);   
  var _id=this.props.match.params.id;
fetch('/api/interviewer/view',{
    method: "post",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },body:JSON.stringify({_id})
  })
  .then(res=>res.json())
  .then(res=>{this.setState({
    error:res.error||"",
user:res.user||""
});
  
  document.getElementById('company-input').value=this.state.user.company||"";
  document.getElementById('credits').innerHTML=this.state.user.credits||"0";
  document.getElementById('user-input').value=this.state.user.fullname||"";
  document.getElementById('password-input').value=this.state.user.password||"";
  document.getElementById('email-input').value=this.state.user.email||"";
  document.getElementById('contact-input').value=this.state.user.contact||"";
  document.getElementById('timings-input').value=this.state.user.timings||"";
  document.getElementById('experience-input').value=this.state.user.experience||"";
this.interviews();
})
  }


  handleSubmit=(event)=>{
    event.preventDefault();
  var company= document.getElementById('company-input').value

  var fullname=  document.getElementById('user-input').value
  var password= document.getElementById('password-input').value
  var email=  document.getElementById('email-input').value
   var contact= document.getElementById('contact-input').value
   var timings= document.getElementById('timings-input').value
  var experience=  document.getElementById('experience-input').value
  var _id=this.props.match.params.id;
    if(password && email && company){
    var post={
    _id:_id,
      company:company,
fullname:fullname,
contact:contact,
timings:timings,
experience:experience,
      password:password,
      email:email
    
  }
// console.log(post);
return fetch('/api/interviewer/update',{
  method: "post",
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },body:JSON.stringify(post)
})
.then(res=>res.json())
.then(res=>this.setState({message:res.message||"",error:res.error||""}))
   }
   else{
     this.setState({error:"enter email password and contact details properly"})
    
   }

  }
 

  showinterviews=()=>{
    console.log(this.state.interviews)
    if(this.state.interviews){
  var interviews=this.state.interviews.map(interview=>{
    var selection;
    if(interview.selected==1){selection="Yes"}
    else{
      selection="No";
    }
    if(interview.interviewDone===1){
    return(
      <div className="row job-details" key={interview._id}>
   <div className="col-md-4">
   <h5 className="post-font p-1">{interview.applicant.fullname}</h5>
   <h5 className="post-font p-1">{interview.applicant.email}</h5>
   </div>
   <div className="col-md-4">
    <h4 className="post-font p-1">{interview.job.company}</h4>
    <h4 className="post-font p-1">{interview.job.jobrole}</h4>
   
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
     <div className="col-md-2 post-font">
     <h5 className="post-font">Selected</h5>
     <h5 className="post-font">{selection}</h5>
     </div>
     <div className="col-md-2 post-font">
     <h5 className="post-font">Credits</h5>
     <h5 className="post-font">{interview.credits}</h5>
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
     console.log(this.state.user)
      return (
        <div>

<div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" id="backgroundText" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>Your Account</h2>
        </div>
          </div>
          <div className="row profile-card">
<div className="col-md-6" >
         
          <div className="col-md-12" style={{alignItems:"center"}}>
<p className="m-2 font-title">Credits:</p> 
<p className="m-2 font-title" id="credits"></p> 
              
</div>
          <div className="col-md-12" style={{alignItems:"center"}}>
<p className="m-2 font-title">Full Name:</p> 
<input type="text" id="user-input" placeholder="Fullname" required="required" />
              
</div>

<div className="col-md-12" style={{alignItems:"center"}}>
<p className="m-2 font-title">Email :</p> 
<input type="email" id="email-input" placeholder="E-mail" required="required" />
                 </div>
                 
                 <div className="col-md-12" style={{alignItems:"center"}}>
<p className="m-2 font-title">Contact:</p> 
                 <input type="number" id="contact-input" placeholder="contact number" required="required" />
                 </div>

                 </div>
                 <div className="col-md-6">
                 <div className="col-md-12" style={{alignItems:"center"}}>
<p className="m-2 font-title">Company:</p> 
                 <input type="text" id="company-input" className="input-form" placeholder="Company" />
                 </div>
                 <div className="col-md-12" style={{alignItems:"center"}}>
<p className="m-2 font-title">Password:</p> 
                 <input type="password" id="password-input" placeholder="Password" required="required" />
                 </div>
                 <div className="col-md-12" style={{alignItems:"center"}}>
<p className="m-2 font-title">Available Timings:</p> 
                 <textarea type="text" id="timings-input" placeholder="Morning 8:00 AM to 10:00 AM" required="required" />
                 </div>
                 <div className="col-md-12" style={{alignItems:"center"}}>
<p className="m-2 font-title">Years of experience:</p> 
                 <input type="number" id="experience-input" placeholder="1" />
                 </div>
           
    
      </div>

      </div>
     
<div className="row" style={{margin:"1%"}}>
  <div className="col-md-12">
  <input  type="submit" className="btn btn-outline-success m-2" onClick={(event)=>{this.handleSubmit(event)}} value="Update "/>
  </div>
  
  
  </div>
      <div className="container">
<div className="row" style={{margin:"3%"}}>
  <div className="col-md-12">
  <h2 style={{color:"gray",fontSize:"30px",fontWeight:"bold",border:"1px solid lightgray",textAlign:"center",padding:"1%"}}>Your Interview History</h2>
  </div>
<div className="col-md-12">
{this.showinterviews()}
</div>

</div>
</div>

        </div>
      );
    }
  }
  


  
  export default withRouter(Account);