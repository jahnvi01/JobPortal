import React, { Component } from 'react';
import {authentication,isAuth} from '../../functions/auth';
class AdminSignin extends Component {
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
    var username=document.getElementById('username-input').value;
       
    if( password && username){
    var post={
  
      password:password,
      username:username
    
  }

fetch('/api/admin/adminSignin',{
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
     
  if(isAuth().role===4){
    this.props.history.push('/admin/dashboard');
  }
 
        
  }
          else{ 
           this.props.history.push('/admin/signin');
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
            <h4 id="log-title" style={{textAlign:"center"}}>Admin Signin </h4>
            <form className="form">
              
             <div id="email-part">
                 <input type="text" id="username-input" className="input-form" placeholder="Username" required="required" />
                 </div>
                                <div id="password-part">
                 <input type="password" id="password-input" placeholder="Password" required="required" />
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
  


  
  export default AdminSignin;