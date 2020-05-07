import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {isAuth,adminAuth} from '../../functions/auth';

class UpdateCompany extends Component {
  state = {
    visible: false,
    company:"",
    message:"",
    error:"",
    loading:false,
    email:"",
  website:"",
  headquarter:"",
  foundedyear:"",
  stage:"",
  size:""
  
  };
  componentWillMount(){
    adminAuth(this.props); 
    var _id=this.props.match.params.id;
 
fetch('/api/company/view',{
  method: "post",
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },body:JSON.stringify({_id})
})
.then(res=>res.json())
.then(res=>{this.setState({
  error:res.error||"",
  email:res.email||"",
  company:res.company||"",
  website:res.website||"",
  foundedyear:res.foundedyear||"",
  headquarter:res.headquarter||"",
  size:res.noOfEmployees||"",
  stage:res.stage||"",

});
this.setvalues();
})  

}

setvalues=()=>{
if(this.state.email!==""){
  console.log(this.state);
  document.getElementById('company-input').value=this.state.company;
  document.getElementById('website-input').value=this.state.website;
  document.getElementById('year-input').value=this.state.foundedyear
  document.getElementById('employees-input').value=this.state.size;
  document.getElementById('headquarter-input').value=this.state.headquarter;
  document.getElementById('stage-input').value=this.state.stage;
 document.getElementById('password-input').value=this.state.password;
document.getElementById('email-input').value=this.state.email;
}
 
}


  handleSubmit=(event)=>{
    event.preventDefault();
    var company=document.getElementById('company-input').value;
    var website=document.getElementById('website-input').value;
     var foundedyear=document.getElementById('year-input').value;
     var employees=document.getElementById('employees-input').value;
     var headquarter=document.getElementById('headquarter-input').value;
     var stage=document.getElementById('stage-input').value;
    var password=document.getElementById('password-input').value;
    var email=document.getElementById('email-input').value;
   var _id=this.props.match.params.id;
    if(password && email && company){
    var post={
    _id:_id,
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
return fetch('/api/company/update',{
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
  
          <div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}> Edit Company Profile</h2>
        </div>
          </div>

  
<div className="row profile-card">
<div className="col-md-12" >
<form>
<div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-5 font-title">Company :</p> 
<input type="text" id="company-input" className="input-form" placeholder="Company" required="required" />
</div>

<div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-5 font-title">Website :</p> 
<input type="text" id="website-input" className="input-form" placeholder="www.abc.com" required="required" />
</div>

<div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-5 font-title">Email :</p> 
<input type="email" id="email-input" className="input-form" placeholder="E-mail" required="required" />
</div>

<div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-5 font-title">Founded Year :</p> 
<input type="number" id="year-input" className="input-form" placeholder="Founded Year" required="required" />
</div>

<div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-5 font-title">No Of Employees :</p> 
<input type="number" id="employees-input" className="input-form" placeholder="No Of Employees" required="required" />
</div>

<div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-5 font-title">Password :</p> 
<input type="password" id="password-input" className="input-form" placeholder="Password" required="required" />
</div>

<div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-5 font-title">Headquarter :</p> 
<input type="text" id="headquarter-input" className="input-form" placeholder="headquarter" required="required" />
</div>

<div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-5 font-title">Stage:</p> 
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
</form>
<button type="submit" onClick={(event)=>this.handleSubmit(event)} className="btn btn-success m-5">Update Profile</button>  

</div>
   
    
 </div>
        </div>
      );
    }
  }
  


  
  export default withRouter(UpdateCompany);