import React, { Component } from 'react';
import {Link, withRouter } from 'react-router-dom';
import ShowAlert from '../functions/alert';
import hands from'../images/hands.png';
import people from'../images/people.png';
import person from'../images/person.png';
import education from'../images/education.png';
import time from'../images/chronometer.png';
import coins from'../images/coins.svg';
import question from'../images/question.png';
import Accounting from'../images/accounting.png';
import { Steps, Divider } from 'antd';
import { Modal, Button } from 'antd';
import Footer from './footer';
import Question from './question'
const { Step } = Steps;
class WhyUs extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
 
  
  };
  handleMessage=()=>{
    var company=document.getElementById("company").value;
    var email=document.getElementById("email-msg").value;
    var message=document.getElementById("msg").value;
    if(company && email && message){
        const post={
            company,email,message
        }
        fetch('/api/admin/message',{
          method: "post",
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(res=>{this.setState({error:res.error||"",message:res.message||""})
     document.getElementById("company").value="";
     document.getElementById("email-msg").value="";
     document.getElementById("msg").value="";
      }) 
    }
    else{
        this.setState({error:"Fill up all the fields"})
    }
      }
    
  handleSubmit=()=>{
var name=document.getElementById("fullname").value;
var email=document.getElementById("email").value;
var message=document.getElementById("message").value;
if(name && email && message){
    const post={
        name,email,message
    }
    fetch('/api/admin/feedback',{
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
showModal = () => {
console.log("ye")
this.setState({visible:true})
 };
handleOk = e => {this.setState({visible:false})}
 handleCancel = e => {
  
    console.log("cancelll")
    this.setState({visible:false})
  
   
  };
  removeAlert=()=>{
    if(this.state.message || this.state.error) {
      setTimeout(()=>{ this.setState({error:"",message:""}) }, 3000);
    }
   }
    render() {
    this.removeAlert()
     
      return (
        <div>
<div className="row home" >
<ShowAlert error={this.state.error} message={this.state.message}/>


<div className="col-md-10" style={{alignSelf:"center",textAlign:"center"}}>
<div className="col-md-12">
            <h2 id="animation" style={{fontSize:"50px",textAlign:"center",fontWeight:"bolder" }}>Reduce 95% of your Interview Process.</h2>
            <h2 id="animation" style={{fontSize:"30px",textAlign:"center",fontWeight:"bolder" }}> (Both Time <span><img src={time} width="30" height="30" alt="time"/></span> & Money  <span><img src={coins} width="25" height="30" alt="coin"/></span>…)</h2>
         <Link to='/company-signup'> <button style={{marginTop:"2%",fontSize:"20px",border:"1px solid #28a745"}} className="btn btn-light">Start Hiring</button>
         </Link>  
        </div>

</div>

<div className="col-md-2" style={{background:"#28a745"}}>
        <div className="col-md-12 mt-5"  style={{padding:"0px",textAlign:"center",padding:"1%",display:"flex",flexDirection:"column"}} >
            <h2 style={{fontSize:"20px", fontWeight:"bold",borderRadius:"0px"}} id="animation"> Do You</h2>
            <h2 style={{fontSize:"20px", fontWeight:"bold",borderRadius:"0px"}} id="animation"> Want to</h2>
            <h2  style={{fontSize:"20px", fontWeight:"bold",borderRadius:"0px"}} id="animation"> Know</h2>
            <button onClick={()=>this.showModal()} style={{marginTop:"2%",fontSize:"25px",color:"#28a745" ,border:"1px solid #28a745"}} className="btn btn-light">HOW ?</button>
            <Modal
          title="Request Call Back"
          visible={this.state.visible}
          onOk={()=>{this.handleOk()}}
          onCancel={()=>{this.handleCancel()}}
        >
         
         <div className="row">
<div className="col-md-12" style={{alignItems:"center"}}>
<p className="font-title">Email/Contact</p> 
<input type="email" className="input-form" id="email-msg"  />
</div>

<div className="col-md-12" style={{alignItems:"center"}}>
<p className="font-title">Company</p> 
<input type="text" className="input-form" id="company"  />
</div>

<div className="col-md-12" style={{alignItems:"center"}}>
<p className="font-title">Ask Anything...</p> 
<textarea type="text"  id="msg" className="form-control"  rows="3" />
</div>

<button type="submit" onClick={()=>this.handleMessage()} className="btn btn-success m-3">Send</button>  
      </div>
   

        </Modal>

   
            <img src={question} height="70" width="50" style={{marginLeft:"auto",marginRight:"auto"}} className="mt-3" alt="man"/>
        </div>

    
    </div>


</div>
   
 {/* <div className="row" style={{marginTop:"2%"}}>
    <div className="col-md-12">
      <div>
      <h2 id="home-title" style={{fontSize:"20px", padding: "1%",textAlign:"center",fontWeight:"bold"}} >Hire the best talent across India</h2>
      </div>

        
           </div>
        </div>
 */}

<div className="row mt-3">
    <div className="col-md-12">
      <div>
      <h2 style={{fontSize:"20px",color:"black",  padding: "1%",textAlign:"center",fontWeight:"bold"}} > Why Choose Us?</h2>
      </div>

        
           
        </div>
      </div>


<div className="container">

<div className="row" style={{marginTop:"2%"}}>
    <div className="col-md-6" style={{marginTop:"2%"}}>
      <div style={{textAlign:"center"}}>
      <img src={education} width="75" height="75" />
      <h5 style={{margin:"2%"}}>Hire The Finest</h5>
     <p>We provide the companies with best and most deserving candidates by filtering them with our own process to save your time and resources.</p>
      </div>

        </div>
        <div className="col-md-6" style={{marginTop:"2%"}}>
      <div style={{textAlign:"center"}}>
      <img src={people} width="75" height="75" />
      <h5 style={{margin:"2%"}}>Team Of Interviewers</h5>
      <p>Team of highly qualified interviewers for initial interview process to send only skillfull folks to your company.</p>
  
      </div>

        </div>
  
        <div className="col-md-6" style={{marginTop:"2%"}}>
      <div style={{textAlign:"center"}}>
      <img src={person} width="75" height="75" />
      <h5 style={{margin:"2%"}}>Find Your Best Fit</h5>
      <p>Get to know your candidates and their past employment, education, experience etc which facilitates you to filter out only eligible ones.</p>
  
      </div>

        </div>
        <div className="col-md-6" style={{marginTop:"2%"}}>
      <div style={{textAlign:"center"}}>
      <img src={Accounting} width="75" height="75" />
      <h5 style={{margin:"2%"}}>No Extra Charge</h5>
      <p>Easy recruitment process with zero cost for services we render.We work as bridge between company and candidates.</p>
  
      </div>

        </div>
  
      </div>
</div>


<div className="row m-3" >
      
      <div className="col-md-12 post-card">
      <div className="row profile-card">
<div className="col-md-12" style={{alignItems:"center"}} >
<p className="m-3 font-title">Company-Name:</p> 
<input type="text" className="input-form" id="fullname" />
</div>
<div className="col-md-12" style={{alignItems:"center"}}>
<p className="m-3 font-title">Email:*</p> 
<input type="email" className="input-form" id="email"  />
</div>

<div className="col-md-12" style={{alignItems:"center"}}>
<p className="m-3 font-title">What brings your company to this platform?</p> 
<textarea type="text"  id="message" className="form-control"  rows="5" />
</div>

<button type="submit" onClick={()=>this.handleSubmit()} className="btn btn-success m-3">Send</button>  
<ShowAlert error={this.state.error} message={this.state.message}/>
</div>


        </div>
      


</div>
<Footer />
<Question />
        </div>
    
      );
    }
  }
  


  
  export default withRouter(WhyUs);