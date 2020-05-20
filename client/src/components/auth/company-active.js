import React, { Component } from 'react';
import {withRouter } from 'react-router-dom';
import {authentication,isAuth} from '../../functions/auth';
import ShowAlert from '../../functions/alert';

class CompanyActive extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    token:"",
    user:"",

  };
 
 componentWillUnmount(){
  authentication(this.state,()=>{
    if(isAuth() && isAuth().role===1){
 
     this.props.history.push('/users');
}
      else{ 
       this.props.history.push('/company-signup');
      }
  })

 }
  componentWillMount(){
     
      this.setState({token:this.props.match.params.token});
      this.setState({token:this.props.match.params.token});
      if(isAuth() && isAuth().role===2 && isAuth().verify===1){
         
        this.props.history.push('/company');
}
   
      
  }
activate=()=>{
    const token=this.state.token;
    fetch('/api/csignup',{
        method: "post",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },body:JSON.stringify({token})
      })
      .then(res=>res.json())
      .then(res=>{this.setState({message:res.message||"",error:res.error||"",user:res.user||""})
      if(res.message){

        authentication(this.state,()=>{
            if(isAuth() && isAuth().role===1){
         
             this.props.history.push('/users');
  }
              else{ 
               this.props.history.push('/company-signup');
              }
          })


      
      }
})
}

  render() {
 
    const showLoading = () => (this.state.loading ? <h2>Loading...</h2> : '');
      return (
        <div>
          
        
          <ShowAlert error={this.state.error} message={this.state.message}/>
        <div className="container">
                <h3 className="pb-4">Hey,  Ready to activate your account?</h3>
                {showLoading()}
           
                      <button className="btn btn-outline-success" onClick={()=>{this.activate()}}>
                        Activate Account
                    </button>
              
            </div>

        </div>
      );
    }
  }
  


  
  export default withRouter(CompanyActive);