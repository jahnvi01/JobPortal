import React, { Component } from 'react';
import GoogleLogin from 'react-google-login'
import {authentication,isAuth} from '../../functions/auth';
import ShowAlert from '../../functions/alert';
import { Modal} from 'antd';
import { Radio } from 'antd';
class Signin extends Component {
  
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    token:"",
    user:"",
    email:"",
    role:"Candidate"
  };
  onChange = e => {
  
    this.setState({
      role: e.target.value,
    });

 };
  componentWillUnmount(){
    authentication(this.state,()=>{
      console.log(isAuth());
      if(isAuth()){
   
if(isAuth().role===1){
  console.log(isAuth().role)
  this.props.history.push('/users');
}
else if(isAuth().role===2){
  this.props.history.push('/company');
}
else if(isAuth().role===3){
  this.props.history.push('/interviewer');
}
      
else{ 
  this.props.history.push('/signin');
}
     
        }
    })
 
    }
  
      handleOk = e => {
        

if(this.state.email && this.state.role){

        var post={
  
          password:this.state.email,
          email:this.state.email
        
      }
      var role=this.state.role
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
        console.log(isAuth().role)

        this.setState({visible:false})
        this.props.history.push('/users');
      }
      else if(isAuth().role===2){
        this.props.history.push('/company');
      }
      else if(isAuth().role===3){

        this.setState({visible:false})
        this.props.history.push('/interviewer');
      }
            
      else{ 

        this.setState({visible:false})
        this.props.history.push('/signin');
      }
           
              }
          })
      
      
      
      }
    }
      )
    
  }

else{
  this.setState({error:"Something went wrong.Try again"})

  this.setState({visible:false})
}   


     




      
      }
       handleCancel = e => {
        
          console.log("cancelll")
          this.setState({visible:false})
        
         
        };
    responseGoogle=(response)=>{
      if(!response.error){
        if(response.profileObj){
        this.setState({email:response.profileObj.email,visible:true})

    //  var token=response.wc.access_token;
       console.log(response);
       
  //      const data={
  //        token:token,
  //        email:response.profileObj.email,
  //        fullname:response.profileObj.name,
  //        password:response.profileObj.email,
  //        contact:"Not Given"
  //      }
  //      fetch('/api/googleSignup',{
  //        method: "post",
  //        headers: {
  //          'Accept': 'application/json, text/plain, */*',
  //          'Content-Type': 'application/json'
  //        },body:JSON.stringify(data)
  //      })
  //      .then(res=>res.json())
  //      .then(res=>{this.setState({message:res.message||"",error:res.error||"",user:res.user||""})
  //      if(res.message){
   
  //        authentication(this.state,()=>{
  //            if(isAuth() && isAuth().role===1){
          
  //             this.props.history.push('/users');
  //  }
  //              else{ 
  //               this.props.history.push('/user-signup');
  //              }
  //          })
   
   
       
  //      }
  //    })
        }
}else{
  this.setState({error:"Something went wrong. Try again"})
}
     }
     
  handleDetail=(event)=>{
    event.preventDefault();

    var password=document.getElementById('password-input').value;
    var email=document.getElementById('email-input').value;
    var role=document.getElementById('role-input').value;      
    if( password && email && role!=="Select Your Role"){
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
    console.log(isAuth().role)
    this.props.history.push('/users');
  }
  else if(isAuth().role===2){
    this.props.history.push('/company');
  }
  else if(isAuth().role===3){
    this.props.history.push('/interviewer');
  }
        
  else{ 
    this.props.history.push('/signin');
  }
       
          }
      })
  
  
  
  }
}
  )

    }
    else{
      this.setState({error:"Please fill up all the fields"})
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
        <div className="home">
          
        
        <div className="block">
          <ShowAlert error={this.state.error} message={this.state.message}/>
        <div className="row log">
            <div className="col-md-12 log-card">
            <h4 id="log-title" style={{textAlign:"center"}}>User Signin </h4>
            <form className="form">
              
             <div id="email-part">
                 <input type="email" id="email-input" className="inputform" placeholder="E-mail" required="required" />
                 </div>
                                <div id="password-part">
                 <input type="password" id="password-input" className="inputform" placeholder="Password" required="required" />
                 </div>
             <div id="role-part" className="input-part"> 
                 <select type="text" id="role-input" className="inputform" placeholder="Stage" required="required">
                    <option>Select Your Role</option>
                    <option>Candidate</option>
                    <option>Company</option>
                    <option>Interviewer</option>

                 </select>
                 </div>
                 <input id="reg" type="submit" onClick={(event)=>{this.handleDetail(event)}} value="Signin"/>
                 <div className="mt-2 mb-2"> 
        <GoogleLogin
        clientId="54848677932-9u2660ibcba48npmvopqun758vr4e8ms.apps.googleusercontent.com"
        buttonText="Log In With Google"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
        
        />
        </div>
        <Modal
          title="Choose your role"
          visible={this.state.visible}
          onOk={()=>{this.handleOk()}}
          onCancel={()=>{this.handleCancel()}}
        >
         
         <div className="row">
<div className="col-md-12" style={{alignItems:"center"}}>
<Radio.Group onChange={this.onChange} value={this.state.role}>
        <Radio value="Candidate">Candidate</Radio>
        <Radio value="Company">Company</Radio>
        <Radio value="Interviewer">Interviewer</Radio>
    
      </Radio.Group>
     
</div>

     </div>
   

        </Modal>
        </form>
    
             </div>
             </div>
            </div>

        </div>
      );
    }
  }
  


  
  export default Signin;