import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {isAuth,companyAuth} from '../../functions/auth';
import ShowAlert from '../../functions/alert';
import { Select } from 'antd';
import {locations} from '../../functions/data'
import {skillset,jobroles} from '../../functions/data2'
const { Option } = Select;
class Company extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    location:[],
    skills:[],
  jobrole:""
  };
  componentWillMount(){
    companyAuth(this.props);   
  
  }

addLocation=()=>{
  var name=document.getElementById("location-name").value;
  this.state.location.push(name);
  this.setLocation(name);
  
  }
  setLocation=(name)=>{
    var li = document.createElement("LI");   // Create a <button> element
  li.innerHTML = name;   
  li.classList.add("location-style");                // Insert text
  document.getElementById("locations").appendChild(li); 
    document.getElementById("location-name").value="";
  }
  addSkill=()=>{
    var name=document.getElementById("skill-name").value;
    this.state.skills.push(name);
this.setSkill(name)
    }
setSkill=(name)=>{
  var li = document.createElement("LI");   // Create a <button> element
  li.innerHTML = name;   
  li.classList.add("location-style");                // Insert text
  document.getElementById("skills").appendChild(li); 

  document.getElementById("skill-name").value="";
}
  
handleChange=(value,name) =>{
  console.log(`selected ${value}`);
  this.setState({[name]:value})
  console.log(this.state)
}
showSkills=()=>{
  var skills=skillset.map(skill=>{
      return(
          <Option value={skill} key={skill} label={skill}>
          <div className="demo-option-label-item">
             {skill}
          </div>
        </Option>
      )
  })
  return skills;
}

handleSubmit=()=>{
console.log(this.state);
var role=this.state.jobrole
var salary=document.getElementById("package").value
var description=document.getElementById("description").value
var company=isAuth().company;
var postJob={
  company:company,
  jobrole:role,
  salary:salary,
  description:description,
  location:this.state.location,
  skills:this.state.skills
}

fetch('/api/company/post-job',{
  method: "post",
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },body:JSON.stringify(postJob)
})
.then(res=>res.json())
.then(res=>{this.setState({message:res.message||"",error:res.error||""})
this.props.history.push("/jobs")
})

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
<div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" id="backgroundText" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>Post a job</h2>
        </div>
          </div>
        
          <div className="row m-3" >
      
      <div className="col-md-8 post-card">
      <div className="row profile-card">
<div className="col-md-12" style={{alignItems:"center"}} >
<p className="m-3 font-title">Job-role:</p> 

<Select
className="m-3 select"


    style={{ width: '200px' }}
    placeholder="Enter jobroles"
    onChange={(event)=>{this.handleChange(event,'jobrole')}}
    optionLabelProp="label"
value={this.state.jobrole}
  >
  {
       jobroles.map(role=>{return(
       <Option value={role}>{role}</Option> 
       )})
     }

     </Select>

</div>
<div className="col-md-12" style={{alignItems:"center"}}>
<p className="m-3 font-title">Salary (Per Enum):</p> 
<input className="m-3" type="number" min="0" id="package"  width="10" />
</div>

<div className="col-md-12" style={{alignItems:"center"}}>
<p className="m-3 font-title">Description:</p> 
<textarea className="form-control" rows="3" id="description"  />

</div>
<div className="col-md-12" >
   <div style={{alignItems:"center"}}>
<p className="m-3 font-title">Locations:</p> 
<Select
className="m-3 select"
id="location"
    mode="multiple"
    style={{ width: '200px' }}
    placeholder="Enter Locations"
    onChange={(event)=>{this.handleChange(event,'location')}}
    optionLabelProp="label"
value={this.state.location}
  >
   {locations.map(location=>{
        return(
            <Option value={location} key={location} label={location}>
            <div className="demo-option-label-item">
               {location}
            </div>
          </Option>
        )
    })}
     </Select>

{/* <input type="text" id="location-name" width="30" />
<button onClick={()=>this.addLocation()}>Add</button> */}
</div>

</div>

<div className="col-md-12" >
   <div style={{alignItems:"center"}}>
<p className="m-3 font-title">Skills:</p> 

<Select
className="m-3 select"

    mode="multiple"
    style={{ width: '200px' }}
    placeholder="Enter Skills"
    onChange={(event)=>{this.handleChange(event,'skills')}}
    optionLabelProp="label"
value={this.state.skills}
  >
   {this.showSkills()}
     </Select>
</div>

</div>
<button type="submit" onClick={()=>this.handleSubmit()} className="btn btn-success m-5">Post Job</button>  
<ShowAlert error={this.state.error} message={this.state.message}/>
</div>


        </div>
        <div className="col-md-4">
        <div className="post-card">
<div style={{display:"flex",alignItems:"center"}} >

<p className="m-2 font-title">company Details:</p> 
</div>
<div  style={{display:"flex",alignItems:"center"}}>
<i className='far fa-building p-1' style={{fontSize:'20px',color:"gray"}}></i>
      <p className="m-1 font-title">{isAuth().company}</p> 
</div>

<div  style={{display:"flex",alignItems:"center"}}>
<i className='far fa-address-card' style={{fontSize:'20px',color:"gray"}}></i>
      <p className="m-1 font-title">{isAuth().email}</p> 
</div>
<div  style={{display:"flex",alignItems:"center"}}>
<i className='fas fa-link' style={{fontSize:'20px',color:"gray"}}></i>
      <p className="m-1 font-title">{isAuth().website}</p> 
</div>
<div  style={{display:"flex",alignItems:"center"}}>
<p className="m-1 font-title">Founded Year:</p> 
      <p className="m-1 font-title">{isAuth().foundedyear}</p> 
</div>
<div  style={{display:"flex",alignItems:"center"}}>
<p className="m-1 font-title">Headquarter:</p> 
      <p className="m-1 font-title">{isAuth().headquarter}</p> 
</div>
<div style={{display:"flex",alignItems:"center"}}>
<p className="m-1 font-title">Company Size:</p> 
      <p className="m-1 font-title">{isAuth().noOfEmployees}</p> 
</div>
<div  style={{display:"flex",alignItems:"center"}}>
<p className="m-1 font-title">Company Stage:</p> 
      <p className="m-1 font-title">{isAuth().stage}</p> 
</div>
</div>

</div>


</div>

        </div>
    
      );
    }
  }
  


  
  export default withRouter(Company);