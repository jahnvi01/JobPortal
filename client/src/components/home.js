import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Money from'../images/money.png';
import Tools from'../images/tools.png';
import Accounting from'../images/accounting.png';
import Engineer from'../images/engineer.png';
import { Steps, Divider } from 'antd';
import Footer from './footer';
import Question from './question'

const { Step } = Steps;
class Home extends Component {
  
 state={
   bottom:10,
   erroor:""
 }
 removeAlert=()=>{
  if(this.state.message || this.state.error) {
    setTimeout(()=>{ this.setState({error:"",message:""}) }, 3000);
  }
 }
  render() {
  this.removeAlert()

    return (
        <div>
    <div className="row home">
    <div className="col-md-2"  style={{padding:"0%",background:"white"}}>
        <div className="col-md-12" style={{padding:"0px",textAlign:"center",padding:"1%",background:"#28a745"}} >
            <h2 style={{fontSize:"20px",borderRadius:"0px"}} id="heading"> Choose Your Role</h2>
        </div>
      
        
    <div className="col-md-12"  style={{padding:"0px",textAlign:"center",marginTop:"3%"}}>
    <Link to='/whyUs-candidates'><button type="button" className="btn btn-outline-success home-btn">Candidate</button></Link>

    <Link to='/whyUs'><button type="button" className="btn btn-outline-success home-btn">Company</button></Link>

    <Link to='/whyUs-interviewers'> <button type="button" className="btn btn-outline-success home-btn">Interviewer</button></Link>
    </div>
    
    </div>

<div className="col-md-10" style={{alignSelf:"center"}}>
<div className="col-md-12">
            <h2 id="animation" style={{fontSize:"50px",textAlign:"center",fontWeight:"bolder" }}>Your Dream Job</h2>
            <h2 id="animation" style={{fontSize:"30px",textAlign:"center",fontWeight:"bolder"}}>Is Waiting For You</h2>
        </div>
    
</div>
</div>
<div className="row" style={{marginTop:"3%"}}>
    <div className="col-md-12">
      <div>
      <h2 id="home-title" style={{fontSize:"20px", padding: "1%",textAlign:"center",fontWeight:"bold"}} >Top Product Companies looking for Candidates like you,</h2>
      <h2 id="home-title" style={{fontSize:"20px", padding: "1%",textAlign:"center",fontWeight:"bold"}} > So Just Submit your Resume and Let Top Companies Come to you.
</h2>
      </div>

        
           </div>
        </div>
  
<div className="container">

<div className="row" style={{marginTop:"2%"}}>
<div className="col-md-6" style={{marginTop:"2%"}}>
      <div style={{textAlign:"center"}}>
      <img src={Engineer} width="75" height="75" />
      <h5 style={{margin:"2%"}}> Trusted & Quality Job</h5>
      <p>Search for your requirements and see company profile and visit website to know your workplace before joining.</p>
  
      </div>

        </div>
    <div className="col-md-6" style={{marginTop:"2%"}}>
      <div style={{textAlign:"center"}}>
      <img src={Money} width="75" height="75" />
      <h5 style={{margin:"2%"}}>Connect to Top Companies
</h5>
     <p>Filter hundreds of jobs according to location, skills, salary etc and find your best match to boost up your career.</p>
      </div>

        </div>
        <div className="col-md-6" style={{marginTop:"2%"}}>
      <div style={{textAlign:"center"}}>
      <img src={Tools} width="75" height="75" />
      <h5 style={{margin:"2%"}}>Build Strong Profile</h5>
      <p>Upload Resume to Showcase your experience.Complete your profile to tell us about your skillset and convert your dream job into reality.</p>
  
      </div>

        </div>
  
  
        <div className="col-md-6" style={{marginTop:"2%"}}>
      <div style={{textAlign:"center"}}>
      <img src={Accounting} width="75" height="75" />
      <h5 style={{margin:"2%"}}>No Extra Charge</h5>
      <p>Easy application and interview process with no extra charge.We work as bridge between company and candidates.</p>
  
      </div>

        </div>
  
      </div>
  
</div>

<Footer />
<Question />
      </div>
    );
  }
}

export default (Home);