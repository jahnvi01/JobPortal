import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import Header from '../header';
class CompanySignup extends Component {
  state = {
    visible: false,
    message:"",
    error:""
  };
  handleDetail=(event)=>{
    event.preventDefault();
    var company=document.getElementById('company-input').value;
    var website=document.getElementById('website-input').value;
     var foundedyear=document.getElementById('year-input').value;
     var employees=document.getElementById('employees-input').value;
     var headquarter=document.getElementById('headquarter-input').value;
     var stage=document.getElementById('stage-input').value;
    var password=document.getElementById('password-input').value;
    var email=document.getElementById('email-input').value;
      
    if(password && email){
    var post={
      company:company,
      website:website,
      foundedyear:foundedyear,
      noOfEmployees:employees,
      stage:stage,
      headquarter:headquarter,
      password:password,
      email:email
    
  }
console.log(post);
return fetch('/api/cpresignup',{
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
          
        
        <div className="block">
        <div className="row log">
            <div className="col-md-12 log-card">
            <h4 id="log-title" style={{textAlign:"center"}}>Company Registration </h4>
            <form className="form">
                 <div id="company-part" className="input-part"> 
                 <input type="text" id="company-input" className="input-form" placeholder="Company" required="required" />
                 </div>

                 <div id="website-part" className="input-part"> 
                 <input type="text" id="website-input" className="input-form" placeholder="www.abc.com" required="required" />
                 </div>

             <div id="email-part" className="input-part">
                 <input type="email" id="email-input" className="input-form" placeholder="E-mail" required="required" />
                 </div>
                 <div id="year-part" className="input-part">
                 <input type="number" id="year-input" className="input-form" placeholder="Founded Year" required="required" />
                 </div>
                 <div id="employees-part" className="input-part">
                 <input type="number" id="employees-input" className="input-form" placeholder="No Of Employees" required="required" />
                 </div>
                  <div id="password-part" className="input-part">
                 <input type="password" id="password-input" className="input-form" placeholder="Password" required="required" />
                 </div>
                 <div id="headquarter-part" className="input-part">
                 <input type="text" id="headquarter-input" className="input-form" placeholder="headquarter" required="required" />
                 </div>
                 <div id="stage-part" className="input-part"> 
                 <select type="text" id="stage-input" className="input-form" placeholder="Stage" required="required">
                    <option>Select company stage</option>
                    <option>Seed</option>
                    <option>Series A</option>
                    <option>Series B</option>
                    <option>Series C+</option>
                    <option>Acquired</option>
                    <option>Enterprise</option>
                 </select>
                 </div>
        <input id="reg" type="submit" onClick={(event)=>{this.handleDetail(event)}} value="Register "/>
        <Link to="/signin"><p id="new">Already have an account? Login here.</p></Link>
        </form>
             </div>
             </div>
            </div>

        </div>
      );
    }
  }
  


  
  export default CompanySignup;