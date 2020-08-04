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
import Question from './question'
import Accounting from'../images/accounting.png';
import { Steps, Divider } from 'antd';
import Footer from './footer';
const { Step } = Steps;
class IntroI extends Component {
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


<div className="col-md-12" style={{alignSelf:"center",textAlign:"center"}}>
<div className="col-md-12">
            <h2 id="animation" style={{fontSize:"50px",textAlign:"center",fontWeight:"bolder" }}>Start Earning Today</h2>
            <h2 id="animation" style={{fontSize:"30px",textAlign:"center",fontWeight:"bolder" }}>Just by taking interviews in comfortable timings</h2>
         <Link to='/interviewer-signup'> <button style={{marginTop:"2%",fontSize:"20px",border:"1px solid #28a745"}} className="btn btn-light">Start Interviewing</button>
         </Link>  
        </div>

</div>
</div>

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
<Footer />
<Question />
        </div>
    
      );
    }
  }
  


  
  export default withRouter(IntroI);