import React, { Component } from 'react';
import {Link, withRouter } from 'react-router-dom';
import ShowAlert from '../functions/alert';
import hands from'../images/hands.png';
import people from'../images/people.png';
import person from'../images/person.png';
import education from'../images/education.png';
import Accounting from'../images/accounting.png';
import { Steps, Divider } from 'antd';
import Footer from './footer';
const { Step } = Steps;
class WhyUs extends Component {
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
  render() {
     
      return (
        <div>
<div className="row home" >
<ShowAlert error={this.state.error} message={this.state.message}/>


<div className="col-md-12" style={{alignSelf:"center",textAlign:"center"}}>
<div className="col-md-12">
            <h2 style={{color:"white",fontSize:"50px",textAlign:"center",fontWeight:"bolder" ,textShadow:"rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px, rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px, rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px, rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px, rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px, rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px, rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px, rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px, rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px, rgb(0, 0, 0) 2.88051px -0.838247px 0px"}}>Hire Best Candidates Across India</h2>
            <h2 style={{color:"white",fontSize:"30px",textAlign:"center",fontWeight:"bolder",textShadow: "rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px, rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px, rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px, rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px, rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px, rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px, rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px, rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px, rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px, rgb(0, 0, 0) 2.88051px -0.838247px 0px" }}>Get Best Fit For Your Requirements</h2>
         <Link to='/company-signup'> <button style={{marginTop:"2%",fontSize:"20px",border:"1px solid black"}} className="btn btn-light">Start Hiring</button>
         </Link>  
        </div>

</div>
</div>
   

<div className="row" style={{marginTop:"2%"}}>
    <div className="col-md-12">
      <div>
      <h2 style={{fontSize:"20px",color:"black",  padding: "1%",textAlign:"center",fontWeight:"bold"}} >Find Best Candidates In Just 3 Steps</h2>
      </div>

        
           </div>
        </div>
   
<div className="container" style={{margin:"5%"}}>
   
<div className="row">
    <div className="col-md-12">
<Steps >
          <Step title="Step 1" description="Post Your Requirements" />
          <Step title="Step 2" description="Schedule An Interview" />
          <Step title="Step 3" description="Find Your Best Fit" />
        </Steps>

        </div></div></div>
<div className="row">
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
<p className="m-3 font-title">Email:</p> 
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
        </div>
    
      );
    }
  }
  


  
  export default withRouter(WhyUs);