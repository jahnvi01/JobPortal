import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import Header from '../header';
class UserSignup extends Component {
  state = {
    visible: false,
    message:"",
    error:""
  };
  handleDetail=(event)=>{
    event.preventDefault();
    var username=document.getElementById('user-input').value;
    var password=document.getElementById('password-input').value;
    var email=document.getElementById('email-input').value;
    var contact=document.getElementById('contact-input').value;    
    if(username && password && email){
    var post={
      username:username,
      password:password,
      email:email,
      contact:contact
    
  }
console.log(post);
return fetch('/api/userpresignup',{
  method: "post",
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },body:JSON.stringify(post)
})
.then(res=>res.json())
.then(res=>console.log(res))
    }
  }
  render() {

      return (
        <div>
          
        <Header />
        <div className="block">
        <div className="row log">
            <div className="col-md-12 log-card">
            <h4 id="log-title" style={{textAlign:"center"}}>Candidate Registration </h4>
            <form className="form">
                 <div id="uname"> 
                 <input type="text" id="user-input" placeholder="Fullname" required="required" />
                 </div>

             <div id="email-part">
                 <input type="email" id="email-input" placeholder="E-mail" required="required" />
                 </div>
                 <div id="contact-part">
                 <input type="number" id="contact-input" placeholder="contact number" required="required" />
                 </div>
                  <div id="password-part">
                 <input type="password" id="password-input" placeholder="Password" required="required" />
                 </div>
        <input id="reg" type="submit" onClick={(event)=>{this.handleDetail(event)}} value="Register "/>
        <Link to="/"><p id="new">Already have an account? Login here.</p></Link>
        </form>
             </div>
             </div>
            </div>

        </div>
      );
    }
  }
  


  
  export default UserSignup;