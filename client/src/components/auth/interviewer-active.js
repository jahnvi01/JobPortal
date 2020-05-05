import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import Header from '../header';
import {authentication,isAuth} from '../../functions/auth';
class IntActive extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    token:"",
    user:"",

  };
  componentWillMount(){
     
      this.setState({token:this.props.match.params.token});
      if(isAuth() && isAuth().role===3 && isAuth().verify===1){
         
        this.props.history.push('/interviewer');
}
      
  }
activate=()=>{
    const token=this.state.token;
    fetch('/api/intsignup',{
        method: "post",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },body:JSON.stringify({token})
      })
      .then(res=>res.json())
      .then(res=>{this.setState({message:res.message||"",error:res.error||"",user:res.user||""});
      if(this.state.message){

        authentication(this.state,()=>{
            if(isAuth() && isAuth().role===3){
   
            this.props.history.push('/interviewer');
  }
              else{ 
               this.props.history.push('/interviewer-signup');
              }
          })


      
      }
    })
   
}
componentDidMount(){
    console.log(this.state);
}
  render() {
 
    const showLoading = () => (this.state.loading ? <h2>Loading...</h2> : '');
      return (
        <div>
          
        
    
        <div className="container">
                <h3 className="pb-4">Hey,  Ready to activate your account?</h3>
                {showLoading()}
           
                      <button className="btn btn-outline-primary" onClick={()=>{this.activate()}}>
                        Activate Account
                    </button>
              
            </div>

        </div>
      );
    }
  }
  


  
  export default withRouter(IntActive);