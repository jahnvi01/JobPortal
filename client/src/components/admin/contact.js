import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {isAuth,adminAuth} from '../../functions/auth';

class Contact extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    token:"",
    user:"",

  };
  componentWillMount(){
  adminAuth(this.props);   
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
.then(res=>console.log(res))
   }
   else{
       alert("enter email password and contact details properly")
   }

  }
 

  render() {
     console.log(this.state.user)
      return (
        <div>

<div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>Contact Interviewers</h2>
        </div>
          </div>
          <div className="row profile-card">
<div className="col-md-6 m-2 post-card" >
          <form className="form">
          <div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-3 font-title">Credits :</p> 
<p className="m-3 font-title" id="credits"></p> 
              
</div>
          <div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-3 font-title">Full Name :</p> 
<input type="text" id="user-input" placeholder="Fullname" required="required" />
              
</div>

<div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-3 font-title">Email :</p> 
<input type="email" id="email-input" placeholder="E-mail" required="required" />
                 </div>
                 
                 <div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-3 font-title">Contact :</p> 
                 <input type="number" id="contact-input" placeholder="contact number" required="required" />
                 </div>
                 <div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-3 font-title">Company :</p> 
                 <input type="text" id="company-input" className="input-form" placeholder="Company" />
                 </div>
                 <div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-3 font-title">Password :</p> 
                 <input type="password" id="password-input" placeholder="Password" required="required" />
                 </div>
                 <div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-3 font-title">Available Timings :</p> 
                 <textarea type="text" id="timings-input" placeholder="Morning 8:00 AM to 10:00 AM" required="required" />
                 </div>
                 <div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-3 font-title">Years of experience :</p> 
                 <input type="number" id="experience-input" placeholder="1" />
                 </div>
              
        </form>
        <input id="reg" type="submit" className="btn btn-outline-primary m-3" onClick={(event)=>{this.handleSubmit(event)}} value="Update "/>
      
      </div>
 
<div className="col-md-6"></div>

      </div>

        </div>
      );
    }
  }
  


  
  export default withRouter(Contact);