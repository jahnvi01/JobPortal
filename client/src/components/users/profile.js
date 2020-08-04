import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import moment from 'moment';
import {isAuth,userAuth} from '../../functions/auth';
import ShowAlert from '../../functions/alert';
class Profile extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    token:"",
    jobs:[],
    list:[]

  };
  componentWillMount(){
    userAuth(this.props);   
    fetch('/api/users/jobs',{
      method: "get",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then(res=>this.setState({jobs:res,list:res}))
  }
  showLocation=(location)=>{
    if(location){
         return  location.map(city=>{
        return (
        <p className="font p-1" key={city}>{city}</p> 
        )
    })
}
}

handleSubmit=(event,jobId)=>{
  if(!isAuth()){
    this.props.history.push('/')
  }
  var jobId=jobId;
  var userId=isAuth()._id;
  var apply={
  jobId:jobId,
  userId:userId
  }
  var alert=event.target.parentNode.nextSibling;
 
  fetch('/api/users/apply',{
    method: "post",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },body:JSON.stringify(apply)
  })
  .then(res=>res.json())
  .then(res=>{this.setState({error:res.error||"",message:res.message||""})
 
})
  }
  
showJobs=()=>{
  if(this.state.jobs){
var jobs=this.state.jobs.map(job=>{
  return(
    <div className="row job-details" key={job._id}>
 <div className="col-md-2">
 <i className='fas fa-briefcase' style={{fontSize:'36px',color:"gray",background:"lightgray",padding:"5%"}}></i>
 </div>
 <div className="col-md-3 post-font" style={{color:"black"}}>
  <h4>{job.jobrole}</h4>
  <div style={{display:"flex"}}>
  <i className='far fa-building p-1' style={{fontSize:'20px',color:"gray"}}></i>
  <h5 className="post-font p-1">{job.company}</h5>
  
  </div>

 </div>
 <div className="col-md-2 post-font">
  <h5>{job.salary}₹</h5>
 <h5 style={{fontSize:"16px"}}>{moment(job.createdAt).fromNow()}</h5>
 </div>
 <div className="col-md-3" style={{display:"flex"}}>
 <i className="material-icons p-1" style={{fontSize:"20px",color:"gray"}}>pin_drop</i>
    {this.showLocation(job.location)}
 </div>
 <div className="col-md-1 post-font">
   <Link to={`/view/${job._id}`}>
 <button type="button" className="btn btn-outline-success">View</button>
</Link>
   </div>
   <div className="col-md-1 post-font">

 <button type="button"  onClick={(event)=>this.handleSubmit(event,job._id)} className="btn btn-outline-success">Apply</button>

   </div>
 
  </div>
  )

})
return jobs;
  }
  else{
    return(
      <h3>No Jobs To Show</h3>
    )
  }
}
addFilters=()=>{
 var role=document.getElementById("role").value;
 var salary=document.getElementById("salary").value;
 var location=document.getElementById("location").value;
  console.log(role+salary)
  var jobs=this.state.list;
  if(role!=="Select Job Role" && role){
    jobs=jobs.filter(job=>job.jobrole===role);
  }
  if(salary){
    salary=parseInt(salary,10)
   jobs=jobs.filter(job=>job.salary<=salary);
 
  }
  if(location){
    jobs=jobs.filter(job=>job.location.includes(location)); 
  }
  console.log(jobs)
  this.setState({jobs:jobs})
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
   <ShowAlert error={this.state.error} message={this.state.message}/>

          <div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}> View Companies</h2>
        </div>
          </div>

    <div className="container">
    <div className="row job-details">
  <div className="col-md-3">
    <select id="role">
      <option>Select Job Role</option>
      <option>Android Engineer </option>
      <option>Backend Engineer </option>
      <option>Data Engineer </option>
      <option> DevOps</option>
      <option>Frontend Developer</option>
      <option>Full stack developer</option>
      <option> IOS Engineer</option>
      <option>QA/SDET </option>
      <option>Data Scientist </option>
      <option>Engineering Manager </option>
      <option>Product Manager </option>
     
    </select>
  </div>
  <div className="col-md-3">
    <input type="number" placeholder="Salary" id="salary"/>
  </div>
  <div className="col-md-3">
    <input type="text" placeholder="location" id="location"/>
    </div>
  {/* <div className="col-md-3"><input type="number" /></div> */}
  <div className="col-md-3"><input type="submit" value="Filter" className="btn btn-outline-success" onClick={()=>{this.addFilters()}}/></div>
  </div>
  <div className="row">
    <div className="col-md-12">
       {this.showJobs()}
       </div>
       </div>
       </div>
        </div>
  
      );
    }
  }
  


  
  export default withRouter(Profile);

