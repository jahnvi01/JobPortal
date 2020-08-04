import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {adminAuth} from '../../functions/auth';

class Companies extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    companies:[]
  
  };
  componentWillMount(){
    adminAuth(this.props); 
    //  var company=isAuth().company 
    fetch('/api/admin/companies',{
        method: "get",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      .then(res=>res.json())
      .then(res=>this.setState({companies:res||[],error:res.error||""}))
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
  
  removeAlert=()=>{
    if(this.state.message || this.state.error) {
      setTimeout(()=>{ this.setState({error:"",message:""}) }, 3000);
    }
   }
    render() {
    this.removeAlert()
      console.log(this.state.companies)
      return (
        <div>
<div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>View And Edit Companies </h2>
        </div>
          </div>
          <div className="container">
  
  {this.showcompanies()}

   </div>
        </div>
    
      );
    }
  }
  


  
  export default withRouter(Companies);