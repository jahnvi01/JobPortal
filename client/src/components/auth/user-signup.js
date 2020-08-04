import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import ShowAlert from '../../functions/alert';
import GoogleLogin from 'react-google-login'
import {authentication,isAuth} from '../../functions/auth';
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
      fullname:username,
      password:password,
      email:email,
      contact:contact
    
  }
console.log(post);
return fetch('/api/presignup',{
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
  responseGoogle=(response)=>{
    if(!response.error){
   var token=response.wc.access_token;
    console.log(response.profileObj);
    const data={
      token:token,
      email:response.profileObj.email,
      fullname:response.profileObj.name,
      password:response.profileObj.email,
      contact:"Not Given"
    }
    fetch('/api/googleSignup',{
      method: "post",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(res=>{this.setState({message:res.message||"",error:res.error||"",user:res.user||""})
    if(res.message){

      authentication(this.state,()=>{
          if(isAuth() && isAuth().role===1){
       
           this.props.history.push('/users');
}
            else{ 
             this.props.history.push('/user-signup');
            }
        })


    
    }
  })
}else{
  this.setState({error:"Something went wrong. Try again"})
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
            <h4 id="log-title" style={{textAlign:"center"}}>Candidate Registration </h4>
            <form className="form">
                 <div id="uname"> 
                 <input type="text" id="user-input" className="inputform" placeholder="Fullname" required="required" />
                 </div>

             <div id="email-part">
                 <input type="email" id="email-input" className="inputform" placeholder="E-mail" required="required" />
                 </div>
                 <div id="contact-part">
                 <input type="number" id="contact-input" className="inputform" placeholder="contact number" required="required" />
                 </div>
                  <div id="password-part">
                 <input type="password" id="password-input" className="inputform" placeholder="Password" required="required" />
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
        <Link to="/signin"><p id="new">Already have an account? Login here.</p></Link>
        </form>
             </div>
             </div>
            </div>

        </div>
      );
    }
  }
  


  
  export default UserSignup;