import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import ShowAlert from '../../functions/alert';
import GoogleLogin from 'react-google-login'
import {authentication,isAuth} from '../../functions/auth';
import { Modal } from 'antd';
class CompanySignup extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    email:""
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
.then(res=>this.setState({message:res.message||"",error:res.error||""}))
    }
  }
  handleOk = e => {
        

    if(this.state.email){
    
          
      var company=document.getElementById('companyinput').value;
    var website=document.getElementById('websiteinput').value;
     var foundedyear=document.getElementById('yearinput').value;
     var employees=document.getElementById('employeesinput').value;
     var headquarter=document.getElementById('headquarterinput').value;
     var stage=document.getElementById('stageinput').value;

      
 
    var post={
      company:company,
      website:website,
      foundedyear:foundedyear,
      noOfEmployees:employees,
      stage:stage,
      headquarter:headquarter,
      password:this.state.email,
      email:this.state.email,
      token:this.state.token
    
  }
console.log(post);
return fetch('/api/companySignup',{
  method: "post",
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },body:JSON.stringify(post)
})
.then(res=>res.json())
.then(res=>{this.setState({message:res.message||"",error:res.error||"",user:res.user||"",token:res.token})
if(res.message==="Signup success!"){

  authentication(this.state,()=>{
   if(isAuth() && isAuth().role===2){

     this.props.history.push('/company');
} 
       else{ 
        this.props.history.push('/company-signup');
       }
    })



}
})
}else{
this.setState({error:"Something went wrong. Try again"})
}
    }
             
           handleCancel = e => {
            
              console.log("cancelll")
              this.setState({email:"",visible:false})
            
             
            };
        

  responseGoogle=(response)=>{
    if(!response.error){
    var token=response.wc.access_token;
 
     const data={
  
       email:response.profileObj.email,

     }

     this.setState({})
     fetch('/api/cgoogleSignup',{
       method: "post",
       headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
       },body:JSON.stringify(data)
     })
     .then(res=>res.json())
     .then(res=>{
   

if(res.message==="Register your profile first"){
  this.setState({message:res.message||"",token:token,email:response.profileObj.email,visible:true})
}
else{
  this.setState({error:res.error||""})
}
   })
  
  }

  }
  removeAlert=()=>{
    if(this.state.message || this.state.error) {
      setTimeout(()=>{ this.setState({error:"",message:""}) }, 3000);
    }
   }
    render() {
    this.removeAlert()

      return (
        <div className="signup">
          
        
        <div className="block">
        <ShowAlert error={this.state.error} message={this.state.message}/>
        <div className="row log">
            <div className="col-md-12 log-card">
            <h4 id="log-title" style={{textAlign:"center"}}>Company Registration </h4>
            <form className="form">
                 <div id="company-part" className="input-part"> 
                 <input type="text" id="company-input" className="inputform" placeholder="Company" required="required" />
                 </div>

                 <div id="website-part" className="input-part"> 
                 <input type="text" id="website-input" className="inputform" placeholder="www.abc.com" required="required" />
                 </div>

             <div id="email-part" className="input-part">
                 <input type="email" id="email-input" className="inputform" placeholder="E-mail" required="required" />
                 </div>
                 <div id="year-part" className="input-part">
                 <input type="number" id="year-input" className="inputform" placeholder="Founded Year" required="required" />
                 </div>
                 <div id="employees-part" className="input-part">
                 <input type="number" id="employees-input" className="inputform" placeholder="No Of Employees" required="required" />
                 </div>
                  <div id="password-part" className="input-part">
                 <input type="password" id="password-input" className="inputform" placeholder="Password" required="required" />
                 </div>
                 <div id="headquarter-part" className="input-part">
                 <input type="text" id="headquarter-input" className="inputform" placeholder="headquarter" required="required" />
                 </div>
                 <div id="stage-part" className="input-part"> 
                 <select type="text" id="stage-input" className="inputform" placeholder="Stage" required="required">
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
        <div className="mt-2 mb-2"> 
        <GoogleLogin
        clientId="54848677932-9u2660ibcba48npmvopqun758vr4e8ms.apps.googleusercontent.com"
        buttonText="Sign Up With Google"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
        
        />
        </div>  
        <Modal
          title="Profile Registration"
          visible={this.state.visible}
          onOk={()=>{this.handleOk()}}
          onCancel={()=>{this.handleCancel()}}
        >
         
 
         <div className="row">
            <div className="col-md-12">
            <h4 id="log-title" style={{textAlign:"center"}}>Company Registration </h4>
            <form className="form">
                 <div id="company-part" className="input-part"> 
                 <input type="text" id="companyinput" className="inputform" placeholder="Company" required="required" />
                 </div>

                 <div id="website-part" className="input-part"> 
                 <input type="text" id="websiteinput" className="inputform" placeholder="www.abc.com" required="required" />
                 </div>

                 <div id="year-part" className="input-part">
                 <input type="number" id="yearinput" className="inputform" placeholder="Founded Year" required="required" />
                 </div>
                 <div id="employees-part" className="input-part">
                 <input type="number" id="employeesinput" className="inputform" placeholder="No Of Employees" required="required" />
                 </div>
             
                 <div id="headquarter-part" className="input-part">
                 <input type="text" id="headquarterinput" className="inputform" placeholder="headquarter" required="required" />
                 </div>
                 <div id="stage-part" className="input-part"> 
                 <select type="text" id="stageinput" className="inputform" placeholder="Stage" required="required">
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
</div>
</div>
        </Modal>
     
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