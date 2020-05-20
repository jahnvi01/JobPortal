import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ShowAlert from '../functions/alert';
class ContactUs extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
 
  
  };
  handleSubmit=()=>{
var name=document.getElementById("fullname").value;
var email=document.getElementById("email").value;
var message=document.getElementById("message").value;
if(name && email && message){
    const post={
        name,email,message
    }
    fetch('/api/admin/contact',{
        method: "post",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },body:JSON.stringify(post)
      })
      .then(res=>res.json())
      .then(res=>{
        this.setState({message:res.message||"",error:res.error||""});
      })      
}
else{
    this.setState({error:"Fill up all the fields"})
}
  }
  render() {
     
      return (
        <div>
<div className="row unit-5 background text-center" >
    {(this.state.message || this.state.error) && (<ShowAlert error={this.state.error} message={this.state.message}/>)       
    }

     
      <div className="col-md-6 offset-3" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>Conatct Us</h2>
        </div>
          </div>
        
          <div className="row m-3" >
      
      <div className="col-md-8 post-card">
      <div className="row profile-card">
<div className="col-md-12" style={{alignItems:"center"}} >
<p className="m-3 font-title">Full-Name:</p> 
<input type="text" className="input-form" id="fullname" />
</div>
<div className="col-md-12" style={{alignItems:"center"}}>
<p className="m-3 font-title">Email:</p> 
<input type="email" className="input-form" id="email"  />
</div>

<div className="col-md-12" style={{alignItems:"center"}}>
<p className="m-3 font-title">Message:</p> 
<textarea type="text" id="description" id="message" rows="5" cols="80" />
</div>

<button type="submit" onClick={()=>this.handleSubmit()} className="btn btn-success m-3">Message</button>  
<ShowAlert error={this.state.error} message={this.state.message}/>
</div>


        </div>
        <div className="col-md-4">
        <div className="post-card">
<div style={{alignItems:"center"}} >

<p className="m-2 font-title">Contact Info:</p> 
</div>
<div  style={{alignItems:"center"}}>
      <p className="m-1 font-title">Address:</p> 
      <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
</div>

<div  style={{alignItems:"center"}}>
      <p className="m-1 font-title">Phone:</p> 
      <p>+1 232 3235 324</p>
</div>
<div  style={{alignItems:"center"}}>
      <p className="m-1 font-title">Email Address:</p> 
      <p>youremail@domain.com</p>
</div>
</div>

</div>


</div>

        </div>
    
      );
    }
  }
  


  
  export default withRouter(ContactUs);