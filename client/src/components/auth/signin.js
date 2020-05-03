import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import {authentication,isAuth} from '../../functions/auth';
import Header from '../header';
class Signin extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    token:"",
    user:"",
  };
  handleDetail=(event)=>{
    event.preventDefault();

    var password=document.getElementById('password-input').value;
    var email=document.getElementById('email-input').value;
    var role=document.getElementById('role-input').value;      
    if( password && email && role){
    var post={
  
      password:password,
      email:email
    
  }
console.log(role);
var api
if(role==="Candidate"){
api="/api/usersignin";
}
else if(role==="Company"){
  api="/api/csignin";
}
else if(role==="Interviewer"){
  api="/api/intsignin";
}
fetch(`${api}`,{
  method: "post",
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },body:JSON.stringify(post)
})
.then(res=>res.json())
.then(res=>{
  this.setState({message:res.message||"",error:res.error||"",user:res.user||"",token:res.token||""});
  console.log(this.state)
  if(this.state.message){
  
    authentication(this.state,()=>{
        console.log(isAuth());
        if(isAuth()){
     
  if(isAuth().role===1){
    this.props.history.push('/users');
  }
  else if(isAuth().role===2){
    this.props.history.push('/company');
  }
  else if(isAuth().role===3){
    this.props.history.push('/interviewer');
  }
        
  }
          else{ 
           this.props.history.push('/signin');
          }
      })
  
  
  
  }
}
  )

    }
  
  }
  render() {

      return (
        <div>
          
        
        <div className="block">
        <div className="row log">
            <div className="col-md-12 log-card">
            <h4 id="log-title" style={{textAlign:"center"}}>User Signin </h4>
            <form className="form">
              
             <div id="email-part">
                 <input type="email" id="email-input" placeholder="E-mail" required="required" />
                 </div>
                                <div id="password-part">
                 <input type="password" id="password-input" placeholder="Password" required="required" />
                 </div>
             <div id="role-part" className="input-part"> 
                 <select type="text" id="role-input" className="input-form" placeholder="Stage" required="required">
                    <option>Select Your Role</option>
                    <option>Candidate</option>
                    <option>Company</option>
                    <option>Interviewer</option>

                 </select>
                 </div>
                 <input id="reg" type="submit" onClick={(event)=>{this.handleDetail(event)}} value="Signin"/>
 
        </form>
             </div>
             </div>
            </div>

        </div>
      );
    }
  }
  


  
  export default Signin;