import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import moment from 'moment';
import {isAuth,userAuth} from '../../functions/auth';

class Users extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    token:"",
    jobs:[],

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
    .then(res=>this.setState({jobs:res}))
  }
showJobs=()=>{
  if(this.state.jobs){
var jobs=this.state.jobs.map(job=>{
  return(
    <div className="row job-details" key={job._id}>
 <div className="col-md-2">
 <i className='fas fa-briefcase' style={{fontSize:'36px',color:"gray",background:"lightgray",padding:"5%"}}></i>
 </div>
 <div className="col-md-4 post-font" style={{color:"black"}}>
  <h4>{job.jobrole}</h4>
  <div style={{display:"flex"}}>
  <i className='far fa-building p-1' style={{fontSize:'20px',color:"gray"}}></i>
  <h5 className="post-font p-1">{job.company}</h5>
  
  </div>

 </div>
 <div className="col-md-3 post-font">
  <h5>{job.salary}₹</h5>
 <h5 style={{fontSize:"16px"}}>{moment(job.createdAt).fromNow()}</h5>
 </div>
 <div className="col-md-3 post-font">
   <Link to={`/view/${job._id}`}>
 <button type="button" className="btn btn-outline-primary">View</button>
</Link>
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
  render() {
     
      return (
        <div>
 
          <div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}> View Companies</h2>
        </div>
          </div>

        <div className="container">
  
       {this.showJobs()}

        </div>
        </div>
      );
    }
  }
  


  
  export default withRouter(Users);