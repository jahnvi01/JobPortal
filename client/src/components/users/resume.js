import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import Header from '../header';
import {authentication,isAuth} from '../../functions/auth';


class Resume extends Component {
  state = {
    visible: false,
   
    message:"",
    error:"",
    fileName:"",
    filePath:"",
    };
  componentWillMount(){
  
    const _id=this.props.match.params.id;
    fetch('/api/users/view',{
        method: "post",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },body:JSON.stringify({_id})
      })
      .then(res=>res.json())
      .then(res=>{this.setState({
 
 fileName:res.data.fileName,
 filePath:res.data.filePath
    })
    })
}
show=()=>{
  console.log(this.state.filePath)
    if(this.state.filePath){
      console.log(this.state.filePath)
        return(<embed  style={{justifyContent:"center"}} src={this.state.filePath} width="1000px" height="2100px" />)
    }
    else{
        return(<h3  style={{justifyContent:"center"}}>No Resume To Show</h3>)
    }
}
  render() {
    
      return (
        <div>
  
          <div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}> View Resume</h2>
        </div>
          </div>

  
<div className="row profile-card" style={{justifyContent:"center"}}>
{this.show()}

</div>
        </div>
      );
    }
  }
  


  
  export default withRouter(Resume);