import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {adminAuth} from '../../functions/auth';
import ShowAlert from '../../functions/alert';
class UpdateUser extends Component {
  state = {
    visible: false,
    fullname:"",
    message:"",
    error:"",
    loading:false,
    jobrole:[],
    email:"",
    contact:"",
    fileName:"",
    filePath:"",
    location:[],
    skills:[],
    salary:"",
    yearsOfExperience:"",
    achievements:"",
    education:[],
    pastEmployment:[],
    resume:""
  };
  componentWillMount(){
    adminAuth(this.props); 
    var _id=this.props.match.params.id;
 
fetch('/api/users/view',{
  method: "post",
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },body:JSON.stringify({_id})
})
.then(res=>res.json())
.then(res=>{this.setState({
  error:res.error||"",
  email:res.email||"",
  contact:res.contact||"",
  fullname:res.fullname||"",
  salary:res.salary,
  jobrole: res.jobrole || [],
  skills: res.skills || [],
  achievements: res.achievements || "",
  location: res.location ||[] ,
  yearsOfExperience: res.yearsOfExperience || "",
  education: res.education || [],
  pastEmployment: res.pastEmployment || [],
  fileName:res.fileName ||"",
  filePath:res.filePath || "",
  resume:""
});
this.setvalues();
})  

// document.getElementById("experience").value= this.state.yearsOfExperience;
// document.getElementById("salary").value=this.state.salary ;  

}
addResume=(e)=>{
  if(e.target.files[0].size<=20000000){
    this.setState({resume:e.target.files[0]})
    console.log(this.state.resume)
  }
  
  }
  
  uploadResume=(e)=>{
    
    e.preventDefault(); 
    var _id=this.props.match.params.id; 
    var formData = new FormData() 
   console.log(this.state.resume)
    formData.append('file', this.state.resume);
    formData.append('_id',_id);
    fetch('/api/users/upload',{
      method: "post",
      body:formData
    })
    .then(res=>res.json())
    .then(res=>this.setState({fileName:res.fileName,filePath:res.filePath,error:res.error||""}))
  }
setvalues=()=>{
if(this.state.fullname!==""){
  console.log(this.state);
  document.getElementById("experience").value=this.state.yearsOfExperience;
  document.getElementById("salary").value=this.state.salary;
  document.getElementById("achievement").value=this.state.achievements;
const c=document.getElementsByClassName("role-list").length;
for(var i=0;i<c;i++){
var li= document.getElementsByClassName("role-list")[i].childNodes;
if(this.state.jobrole.includes(li[1].innerHTML)){
  li[0].checked=true;
}
}
this.state.location.filter(loc=>{
  this.setLocation(loc);
  
});
this.state.skills.filter(skill=>{
  this.setSkill(skill);
  });
}
  this.state.education.map(data=>{
    this.addEducation(data.name,data.startYear,data.endYear,data.course)
  })
  this.state.pastEmployment.map(data=>{
    this.addEmployment(data.companyName,data.startYear,data.endYear,data.companyRole)
  })
}
  handlejobrole=(event)=>{
const role=event.target.nextSibling.innerHTML;
if(event.target.checked){
    this.state.jobrole.push(role)
}
else{
  this.setState({jobrole: this.state.jobrole.filter(word=>word!==role)}) 

}

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
    addEducation=(clg,startYear,endYear,branch)=>{
var div = document.createElement("DIV"); 
div.setAttribute('class', 'education-list');       
var ta = document.createElement("INPUT");   // Create a <button> element
        ta.setAttribute('class', 'name'); 
        ta.setAttribute('placeholder', 'Enter Institute Name'); 
        ta.setAttribute('type', 'text'); 
        ta.setAttribute('value', clg||'');
        var course = document.createElement("INPUT"); 
        course.setAttribute('class', 'course'); 
        course.setAttribute('placeholder', 'course'); 
        course.setAttribute('type', 'text'); 
course.setAttribute('value', branch||'');
  var start = document.createElement("INPUT"); 
  start.setAttribute('class', 'start'); 
  start.setAttribute('placeholder', 'start-year'); 
  start.setAttribute('type', 'number'); 
start.setAttribute('value', startYear||'');
var end = document.createElement("INPUT"); 
end.setAttribute('class', 'end'); 
end.setAttribute('placeholder', 'end-year'); 
end.setAttribute('type', 'number'); 
end.setAttribute('value', endYear||'');
        div.appendChild(ta);
        div.appendChild(course);
        div.appendChild(start);
        div.appendChild(end);
      document.getElementById("education").appendChild(div); 
   
        }
    

        addEmployment=(company,startYear,endYear,role)=>{
            var div = document.createElement("DIV"); 
            div.setAttribute('class', 'employment-list');       
            var ta = document.createElement("INPUT");   // Create a <button> element
                    ta.setAttribute('class', 'company-name'); 
                    ta.setAttribute('placeholder', 'Enter Company Name'); 
                    ta.setAttribute('type', 'text');
                    ta.setAttribute('value', company||"");
                    var course = document.createElement("INPUT"); 
                    course.setAttribute('class', 'jobrole'); 
                    course.setAttribute('placeholder', 'Job Role'); 
                    course.setAttribute('type', 'text'); 
            course.setAttribute('value', role||"");
              var start = document.createElement("INPUT"); 
              start.setAttribute('class', 'start-emp'); 
              start.setAttribute('placeholder', 'start-year'); 
              start.setAttribute('type', 'number'); 
            start.setAttribute('value', startYear||"");
            var end = document.createElement("INPUT"); 
            end.setAttribute('class', 'end-emp'); 
            end.setAttribute('placeholder', 'end-year'); 
            end.setAttribute('type', 'number'); 
            end.setAttribute('value', endYear||"");
                    div.appendChild(ta);
                    div.appendChild(course);
                    div.appendChild(start);
                    div.appendChild(end);
                  document.getElementById("employment").appendChild(div); 
               
                    }


 addResume=(e)=>{
this.setState({resume:e.target.files[0]})
  
}


  handleSubmit=()=>{
                     
    var salary=document.getElementById("salary").value;
    var experience=document.getElementById("experience").value;
    var achievement=document.getElementById("achievement").value;   
          this.setState({education:[],pastEmployment:[]})
  var education=document.getElementById("education")
  var c=education.childElementCount;
 var list=[];
  this.state.pastEmployment=[];
  for(var i=0;i<c;i++){
var name=document.getElementsByClassName("name")[i].value;
var course=document.getElementsByClassName("course")[i].value;
var start=document.getElementsByClassName("start")[i].value;
var end=document.getElementsByClassName("end")[i].value;
var data={
  name:name,
  startYear:start,
  endYear:end,
  course:course
}
list=this.state.education;
list.push(data)

console.log(list);
this.setState({education:list})
  }     
  var employment=document.getElementById("employment")
  var c=employment.childElementCount;
  list=[];
  this.state.pastEmployment=[];
  for(var i=0;i<c;i++){
    var company=document.getElementsByClassName("company-name")[i].value;
    var role=document.getElementsByClassName("jobrole")[i].value;
    var start=document.getElementsByClassName("start-emp")[i].value;
    var end=document.getElementsByClassName("end-emp")[i].value;
    var data={
      companyName:company,
      startYear:start,
      endYear:end,
      companyRole:role
    }
     list=this.state.pastEmployment;
     console.log(list);
    list.push(data)

 
    this.setState({pastEmployment:list})
      }  
var email=this.state.email;
console.log(email)
var profile={

email:email,
salary:salary,
jobrole:this.state.jobrole,
location:this.state.location,
education:this.state.education,
pastEmployment:this.state.pastEmployment,
yearsOfExperience:experience,
achievements:achievement,
skills:this.state.skills,
fileName:this.state.fileName,
filePath:this.state.filePath,
}


fetch('/api/users/profile',{
  method: "post",
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },body:JSON.stringify(profile)
})
.then(res=>res.json())
//.then(res=>console.log(res))
.then(res=>this.setState({message:res.message||"",error:res.error||""}))
// if(this.state.message){

//   authentication(this.state,()=>{
//       if(isAuth() && isAuth().role===1){
   
//        this.props.history.push('/users');
// }
//         else{ 
//          this.props.history.push('/user-signup');
//         }
//     })



// }
  }
  render() {
    var _id=this.props.match.params.id;
      return (
        <div>
  
          <div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}> Edit Your Profile</h2>
        </div>
          </div>

  
<div className="row profile-card">
<div className="col-md-12" >
<p className="m-5 font-title">Select Your Job-role:</p> 
</div>
    <div className="col-md-4" >
        <ul style={{listStyle:"none"}}>
<li className="role-list">
                <input type="checkbox" onChange={(event)=>{this.handlejobrole(event)}} className="mr-2" />
                <label className="form-check-label">Android Engineer</label>
            </li>
            <li className="role-list">
                <input type="checkbox" onChange={(event)=>{this.handlejobrole(event)}} className="mr-2" />
                <label className="form-check-label">Backend Engineer</label>
            </li>
            <li className="role-list">
                <input type="checkbox" onChange={(event)=>{this.handlejobrole(event)}} className="mr-2" />
                <label className="form-check-label">Data Engineer</label>
            </li>
            <li className="role-list">
                <input type="checkbox" onChange={(event)=>{this.handlejobrole(event)}} className="mr-2" />
                <label className="form-check-label">DevOps</label>
            </li>
</ul>
    
    </div>

    <div className="col-md-4">
    <ul style={{listStyle:"none"}}>
<li className="role-list">
                <input type="checkbox" onChange={(event)=>{this.handlejobrole(event)}} className="mr-2" />
                <label className="form-check-label">Front-end Engineer</label>
            </li>
            <li className="role-list">
                <input type="checkbox" onChange={(event)=>{this.handlejobrole(event)}} className="mr-2" />
                <label className="form-check-label">Full Stack Engineer</label>
            </li>
            <li className="role-list">
                <input type="checkbox" onChange={(event)=>{this.handlejobrole(event)}} className="mr-2" />
                <label className="form-check-label">IOS Engineer</label>
            </li>
            <li className="role-list">
                <input type="checkbox" onChange={(event)=>{this.handlejobrole(event)}} className="mr-2" />
                <label className="form-check-label">QA/SDET</label>
            </li>
</ul>
    
    </div>

    <div className="col-md-4">
    <ul style={{listStyle:"none"}}>
<li className="role-list">
                <input type="checkbox" onChange={(event)=>{this.handlejobrole(event)}} className="mr-2" />
                <label className="form-check-label">Data Scientist</label>
            </li>
            <li className="role-list">
                <input type="checkbox" onChange={(event)=>{this.handlejobrole(event)}} className="mr-2" />
                <label className="form-check-label">Engineering Manager</label>
            </li>
            <li className="role-list">
                <input type="checkbox" onChange={(event)=>{this.handlejobrole(event)}} className="mr-2" />
                <label className="form-check-label">Product Manager</label>
            </li>
            <li className="role-list">
                <input type="checkbox" onChange={(event)=>{this.handlejobrole(event)}} className="mr-2" />
                <label className="form-check-label">others</label>
            </li>
</ul>
            </div>

            <div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-5 font-title">Salary Expectation (per enum) :</p> 
<input type="number" min="0"  id="salary"  width="10" />
</div>

<div className="col-md-12" >
   <div style={{display:"flex",alignItems:"center"}}>
<p className="m-5 font-title">Interested Locations :</p> 
<input type="text" id="location-name" width="30" />
<button onClick={()=>this.addLocation()}>Add</button>
</div>
<div>
    <ul id="locations" style={{display:"flex"}}>

    </ul>
</div>
</div>



<div className="col-md-12" >
   <div style={{display:"flex",alignItems:"center"}}>
<p className="m-5 font-title">Skills :</p> 
<input type="text" id="skill-name" width="30" />
<button onClick={()=>this.addSkill()}>Add</button>
</div>
<div>
    <ul id="skills" style={{display:"flex"}}>

    </ul>
</div>
</div>

<div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-5 font-title">Years Of Experience :</p> 
<input type="number" min="0" id="experience"  width="10" />
</div>

<div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-5 font-title">Achievements :</p> 
<textarea type="text" id="achievement" className="form-control"  rows="3" />
</div>
</div>


<div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-5 font-title">Education :</p> 
<button onClick={()=>this.addEducation()}>Add</button>
</div>
<div id="education"></div>

<div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-5 font-title">Past Employment :</p> 
<button onClick={()=>this.addEmployment()}>Add</button>
</div>
<div id="employment"></div>     
<div className="col-md-12" style={{display:"flex",alignItems:"center"}}>
<p className="m-5 font-title">Resume :</p> 
<form action='.' method="POST" enctype="multipart/form-data">
<input type="file" onChange={(event)=>{this.addResume(event)}} accept="application/pdf"/>
<button id="upload" className="btn btn-success m-1" onClick={(event)=>this.uploadResume(event)}>Upload</button> 
 {this.state.filePath && (<Link to={`/resume/${_id}`}> <button className="btn btn-success m-1" id="resume">View Resume</button> </Link>)}
  </form>                 
</div> 
<button type="submit" onClick={()=>this.handleSubmit()} className="btn btn-success m-5">Update Profile</button>  
<ShowAlert error={this.state.error} message={this.state.message}/>
        </div>
      );
    }
  }
  


  
  export default withRouter(UpdateUser);