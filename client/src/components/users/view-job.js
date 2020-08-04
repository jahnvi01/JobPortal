import React, { Component } from 'react';
import {withRouter } from 'react-router-dom';
import {isAuth,userAuth} from '../../functions/auth';
import ShowAlert from '../../functions/alert';
class ViewJob extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    company:"",
    job:""
 
  };
  componentWillMount(){

  //  userAuth(this.props);   
var _id=this.props.match.params.id;
fetch('/api/users/viewJob',{
    method: "post",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },body:JSON.stringify({_id})
  })
  .then(res=>res.json())
  .then(res=>this.setState({job:res.job,company:res.company}))
  }
showLocation=()=>{
    if(this.state.job.location){
        console.log(this.state.job.location)
 return  this.state.job.location.map(city=>{
        return (
        <p className="font" key={city}>{city}</p> 
        )
    })
}
}

showSkills=()=>{
    if(this.state.job.skills){
      
 return  this.state.job.skills.map(skill=>{
        return (
        <p className="font" key={skill}>{skill}</p> 
        )
    })
}
}

handleSubmit=()=>{
if(!isAuth()){
  this.props.history.push('/')
}
var jobId=this.state.job._id
var userId=isAuth()._id;
var apply={
jobId:jobId,
userId:userId
}

fetch('/api/users/apply',{
  method: "post",
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },body:JSON.stringify(apply)
})
.then(res=>res.json())
.then(res=>this.setState({error:res.error||"",message:res.message||""}))
}
removeAlert=()=>{
  if(this.state.message || this.state.error) {
    setTimeout(()=>{ this.setState({error:"",message:""}) }, 3000);
  }
 }
  render() {
  this.removeAlert()
    console.log(this.state); 
      return (
        <div>
<div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3"  id="backgroundText" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>Apply for a job</h2>
        </div>
          </div>
        
          <div className="row" >
      
      <div className="col-md-8 post-card">
      <div className="row profile-card">
<div className="m-5 col-md-12" style={{alignItems:"center"}} >
      <p className="post-title">{this.state.job.jobrole}</p>
      <div className="row" style={{alignItems:"center"}}>
      <div className="col-md-2" style={{display:"flex"}}>
  <i className='far fa-building p-1' style={{fontSize:'20px',color:"#28a745"}}></i>
  <p className="font" style={{color:"#28a745"}}>{this.state.company.company}</p>
  </div>
  <div  style={{display:"flex",paddingLeft:"2%"}} >
  <i className="material-icons p-1" style={{fontSize:"25px",color:"gray"}}>pin_drop</i>
    {this.showLocation()}
  </div>

</div>
<div className="mt-2" style={{display:"flex",alignItems:"center"}}>
<p className="font-title">Salary(Annual):</p> 
<p className="font-title">{this.state.job.salary}₹</p>
</div>
<div className="mt-2" style={{display:"flex",alignItems:"center"}}>
<p className="font-title">Skills :</p> 
{this.showSkills()}
</div>


</div>
<p className="font-title" style={{color:"gray",padding:"2%"}}>Description:</p> 
<p style={{color:"gray",padding:"2%"}}>{this.state.job.description}</p>
{isAuth() && isAuth().role===1 &&(
 <div> <button type="submit" onClick={()=>this.handleSubmit()} className="btn btn-success m-5">Apply Here</button>  
  <ShowAlert error={this.state.error} message={this.state.message}/></div>

)}

</div>


        </div>
        <div className="col-md-4">
        <div className="post-card">
<div style={{display:"flex",alignItems:"center"}} >

<p className="m-2 font-title">company Details:</p> 
</div>
<div  style={{display:"flex",alignItems:"center"}}>
<i className='far fa-building p-1' style={{fontSize:'20px',color:"gray"}}></i>
      <p className="m-1 font-title">{this.state.company.company}</p> 
</div>

<div  style={{display:"flex",alignItems:"center"}}>
<i className='far fa-address-card' style={{fontSize:'20px',color:"gray"}}></i>
      <p className="m-1 font-title">{this.state.company.email}</p> 
</div>
<div  style={{display:"flex",alignItems:"center"}}>

<i className='fas fa-link' style={{fontSize:'20px',color:"gray"}}></i>
      <p className="m-1 font-title">{this.state.company.website}</p> 
</div>
<div  style={{display:"flex",alignItems:"center"}}>
<p className="m-1 font-title">Founded Year:</p> 
      <p className="m-1 font-title">{this.state.company.foundedyear}</p> 
</div>
<div  style={{display:"flex",alignItems:"center"}}>
<p className="m-1 font-title">Headquarter:</p> 
      <p className="m-1 font-title">{this.state.company.headquarter}</p> 
</div>
<div style={{display:"flex",alignItems:"center"}}>
<p className="m-1 font-title">Size:</p> 
      <p className="m-1 font-title">{this.state.company.noOfEmployees}</p> 
</div>
<div  style={{display:"flex",alignItems:"center"}}>
<p className="m-1 font-title">Stage:</p> 
      <p className="m-1 font-title">{this.state.company.stage}</p> 
</div>

</div>

</div>


</div>

        </div>
    
      );
    }
  }
  


  
  export default withRouter(ViewJob);