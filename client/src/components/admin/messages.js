import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import moment from 'moment';
import {adminAuth} from '../../functions/auth';
import ShowAlert from '../../functions/alert';
class Messages extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    messages:[],

  
  };
  componentWillMount(){
    adminAuth(this.props); 

    fetch('/api/admin/showMessages',{
        method: "get",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      .then(res=>res.json())
      .then(res=>this.setState({messages:res||""}))
  }


  showMessages=()=>{
    if(this.state.messages){
       
  var messages=this.state.messages.map(user=>{
  
    return(
      <div className="row job-details" key={user._id}>
  
   <div className="col-md-12">
    <h4 className="post-font">{user.email}</h4>
    <h4 className="post-font">{user.company}</h4>

    <h5 className="post-font" style={{fontSize:"18px"}}>Message :-{user.message}</h5>
    <h5 style={{fontSize:"16px"}}>{moment(user.createdAt).fromNow()}</h5>
 
  
   </div>
  
  
    </div>
    )
  
  })
  return messages;
    }
    else{
      return(
        <h3>No MessagesTo Show</h3>
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
          <h5 id="heading" style={{background:"white",color:"#28a745",border:"1px solid #28a745"}}>Recent messages</h5>
  {this.showMessages()}

   </div>

        </div>
    
      );
    }
  }
  


  
  export default withRouter(Messages);