import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {adminAuth} from '../../functions/auth';
import ShowAlert from '../../functions/alert';
class Dashboard extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    users:[],
    interviewers:"",
    companies:[]
  
  };
  componentWillMount(){
    adminAuth(this.props); 
    //  var company=isAuth().company 
    fetch('/api/admin/recentData',{
        method: "get",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      .then(res=>res.json())
      .then(res=>this.setState({users:res.users||[],error:res.error||"",companies:res.company||[],interviewers:res.team||""}))
  }


  showUsers=()=>{
    if(this.state.users){
       
  var users=this.state.users.map(user=>{
    console.log(user)
    return(
      <div className="row job-details" key={user._id}>
   <div className="col-md-2">
   <i className='fas fa-house-user' style={{fontSize:'36px',color:"gray",background:"lightgray",padding:"5%"}}></i>
   </div>
   <div className="col-md-3 post-font" style={{color:"black"}}>
    <h4>{user.fullname}</h4>
    <div style={{display:"flex"}}>
    <i className='far fa-address-card p-1' style={{fontSize:'18px',color:"gray"}}></i>
    <h5 className="post-font p-1" style={{fontSize:"18px"}}>{user.email}</h5>
    
    </div>
  
   </div>
   <div className="col-md-3 post-font" style={{display:"flex"}}>
   <i className='fas fa-phone p-1' style={{fontSize:'20px',color:"gray"}}></i>
    <h5>{user.contact}</h5>
    </div>
   <div className="col-md-2 post-font">
     <Link to={`/admin/user-applications/${user._id}`}>
   <button type="button" className="btn btn-outline-success">Applications</button>
  </Link>
     </div>
     <div className="col-md-2 post-font">
     <Link to={`/admin/users/${user._id}`}>
   <button type="button" className="btn btn-outline-success">Update</button>
  </Link>
     </div>
    </div>
    )
  
  })
  return users;
    }
    else{
      return(
        <h3>No Users To Show</h3>
      )
    }
  }
  


  showcompanies=()=>{
    if(this.state.companies){
       
  var companies=this.state.companies.map(company=>{
    return(
      <div className="row job-details" key={company._id}>
   <div className="col-md-2">
   <i className='far fa-building p-1' style={{fontSize:'36px',color:"gray",background:"lightgray",padding:"5%"}}></i>
   </div>
   <div className="col-md-4 post-font" style={{color:"black"}}>
    <h4>{company.company}</h4>
    <div style={{display:"flex"}}>
    <i className='far fa-address-card p-1' style={{fontSize:'18px',color:"gray"}}></i>
    <h5 className="post-font p-1" style={{fontSize:"18px"}}>{company.email}</h5>
    
    </div>
  
   </div>
   <div className="col-md-3 post-font">
   <h5>{company.website}</h5>
    <h5>{company.headquarter}</h5>
    </div>
   <div className="col-md-3 post-font">
     <Link to={`/admin/companies/${company._id}`}>
   <button type="button" className="btn btn-outline-success">Update</button>
  </Link>
  
     </div>

    </div>
    )
  
  })
  return companies;
    }
    else{
      return(
        <h3>No companies To Show</h3>
      )
    }
  }
  

  showTeam=()=>{
    if(this.state.interviewers){
  var interviewers=this.state.interviewers.map(interviewer=>{
    return(
      <div className="row job-details" key={interviewer._id}>
   <div className="col-md-2">
   <i className='fas fa-house-user' style={{fontSize:'36px',color:"gray",background:"lightgray",padding:"5%"}}></i>
   </div>
   <div className="col-md-4 post-font" style={{color:"black"}}>
    <h4>{interviewer.fullname}</h4>
    <div style={{display:"flex"}}>
    <i className='far fa-address-card p-1' style={{fontSize:'18px',color:"gray"}}></i>
    <h5 className="post-font p-1" style={{fontSize:"18px"}}>{interviewer.email}</h5>
    
    </div>
  
   </div>
   <div className="col-md-3 post-font" style={{display:"flex"}}>
   <i className='fas fa-phone p-1' style={{fontSize:'20px',color:"gray"}}></i>
    <h5>{interviewer.contact}</h5>
    </div>
   <div className="col-md-3 post-font">
     <Link to={`/admin/contact/${interviewer._id}`}>
   <button type="button" className="btn btn-outline-success">Contact</button>
  </Link>
     </div>
    </div>
    )
  
  })
  return interviewers;
    }
    else{
      return(
        <h3>No interviewers To Show</h3>
      )
    }
  }
  

  removeAlert=()=>{
    if(this.state.message || this.state.error) {
      setTimeout(()=>{ this.setState({error:"",message:""}) }, 3000);
    }
   }
    render() {
    this.removeAlert()
    
      console.log(this.state)
      return (
        <div>
<div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>Admin Dashboard</h2>
        </div>
          </div>

          <div className="container" style={{marginTop:"2%"}}>
          <h5 id="heading" style={{background:"white",color:"#28a745",border:"1px solid #28a745"}}>Recent Users</h5>
  {this.showUsers()}

   </div>

   <div className="container" style={{marginTop:"2%"}}>
          <h5 id="heading" style={{background:"white",border:"1px solid #28a745",color:"#28a745"}}>Recent Companies</h5>
  {this.showcompanies()}

   </div>

   <div className="container" style={{marginTop:"2%"}}>
          <h5 id="heading" style={{background:"white",border:"1px solid #28a745",color:"#28a745"}}>Recent interviewers</h5>
  {this.showTeam()}

   </div>

        </div>
    
      );
    }
  }
  


  
  export default withRouter(Dashboard);