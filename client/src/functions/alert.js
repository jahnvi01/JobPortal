import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Alert } from 'antd';
import { notification } from 'antd';
class ShowAlert extends Component {
  
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    token:"",
    user:"",
  };
  showAlert=(error,message)=>{
    const args = {
      message: error || message,
     duration: 3,
    };
  
      if(error){
        notification.error(args);
    
      }
  
  
      if(message){
        notification.success(args);
    
      }
  
  

  
  
    
  }
  render() {


      return (
        <div>
          
        
    
          {this.showAlert(this.props.error,this.props.message)}
       
        </div>
      );
    }
  }
  


  
  export default ShowAlert;