import React, { Component } from 'react';
import {Link, withRouter } from 'react-router-dom';
import ShowAlert from '../functions/alert';
import Question from './question'
import Money from'../images/money.png';
import Tools from'../images/tools.png';
import Accounting from'../images/accounting.png';
import Engineer from'../images/engineer.png';
import { Steps, Divider } from 'antd';
import Footer from './footer';
const { Step } = Steps;
class IntroC extends Component {
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
            <h2 id="animation" style={{fontSize:"50px",textAlign:"center",fontWeight:"bolder" }}>Top Product Companies looking for Candidates like you</h2>
            <h2 id="animation" style={{fontSize:"30px",textAlign:"center",fontWeight:"bolder" }}> Just Submit your Resume and Let Companies Come to you.</h2>
         <Link to='/user-signup'> <button style={{marginTop:"2%",fontSize:"20px",border:"1px solid #28a745"}} className="btn btn-light">Start Applying</button>
         </Link>  
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
{/* <div className="row" style={{marginTop:"3%"}}>
    <div className="col-md-12">
      <div>
      <h2 id="home-title" style={{fontSize:"20px", padding: "1%",textAlign:"center",fontWeight:"bold"}} >Spend time on Preparation, </h2>
      <h2 id="home-title" style={{fontSize:"20px", padding: "1%",textAlign:"center",fontWeight:"bold"}} > Let us do the Rest.
</h2>
      </div>

        
           </div>
           </div> */}
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
      <img src={Engineer} width="75" height="75" />
      <h5 style={{margin:"2%"}}> Trusted & Quality Job</h5>
      <p>Search for your requirements and see company profile and visit website to know your workplace before joining.</p>
  
      </div>

        </div>

    <div className="col-md-6" style={{marginTop:"2%"}}>
      <div style={{textAlign:"center"}}>
      <img src={Money} width="75" height="75" />
      <h5 style={{margin:"2%"}}>Save Your Time
</h5>
     <p>Spend time on Preparation,Let us do the rest for you and Get what is best for your future.</p>
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
  


  
  export default withRouter(IntroC);