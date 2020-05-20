import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Money from'../images/money.png';
import Tools from'../images/tools.png';
import Accounting from'../images/accounting.png';
import Engineer from'../images/engineer.png';
class Home extends Component {
  
 
  render() {

    return (
        <div>
    <div className="row home">
    <div className="col-md-2"  style={{padding:"0%",background:"white"}}>
        <div className="col-md-12" style={{padding:"0px",textAlign:"center",padding:"1%",background:"#28a745"}} >
            <h2 style={{fontSize:"20px",borderRadius:"0px"}} id="heading"> Choose Your Role</h2>
        </div>
      
        
    <div className="col-md-12"  style={{padding:"0px",textAlign:"center",marginTop:"3%"}}>
    <Link to='/user-signup'><button type="button" className="btn btn-outline-success home-btn">Candidate</button></Link>

    <Link to='/whyUs'><button type="button" className="btn btn-outline-success home-btn">Company</button></Link>

    <Link to='/interviewer-signup'> <button type="button" className="btn btn-outline-success home-btn">Interviewer</button></Link>
    </div>
    
    </div>

<div className="col-md-10" style={{alignSelf:"center"}}>
<div className="col-md-12">
            <h2 style={{color:"white",fontSize:"50px",textAlign:"center",fontWeight:"bolder" ,textShadow:"rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px, rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px, rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px, rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px, rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px, rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px, rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px, rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px, rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px, rgb(0, 0, 0) 2.88051px -0.838247px 0px"}}>Your Dream Job</h2>
            <h2 style={{color:"white",fontSize:"30px",textAlign:"center",fontWeight:"bolder",textShadow: "rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px, rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px, rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px, rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px, rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px, rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px, rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px, rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px, rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px, rgb(0, 0, 0) 2.88051px -0.838247px 0px" }}>Is Waiting For You</h2>
        </div>

</div>
</div>
   
<div className="row">
    <div className="col-md-12">
      <div>
      <h2 style={{fontSize:"20px",color:"black",border:"1px solid #28a745",background:"white"}} id="heading"> Why Choose Us?</h2>
      </div>

        
           
        </div>
      </div>

<div className="container">

<div className="row" style={{marginTop:"2%"}}>
    <div className="col-md-6" style={{marginTop:"2%"}}>
      <div style={{textAlign:"center"}}>
      <img src={Money} width="75" height="75" />
      <h5 style={{margin:"2%"}}>Search Desired Jobs</h5>
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
      <img src={Engineer} width="75" height="75" />
      <h5 style={{margin:"2%"}}> Trusted & Quality Job</h5>
      <p>Search for your requirements and see company profile and visit website to know your workplace before joining.</p>
  
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


      </div>
    );
  }
}

export default (Home);