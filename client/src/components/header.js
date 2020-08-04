import React, { useState } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {isAuth,signout} from '../functions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,

} from 'reactstrap';


const Header = (props) => {
 
  const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
   
  const setHeader=()=>{
  
    console.log(isAuth().role)
    if(isAuth() && isAuth().role===4){
    return(
  
  
     <Navbar color="white" light expand="md">
     <Link to="/">
     <NavbarBrand className='font-weight-bold' style={{cursor:"pointer"}}>JobFinder</NavbarBrand>
     </Link>
     <NavbarToggler onClick={toggle} />
     <Collapse isOpen={isOpen} navbar>
       <Nav className="ml-auto" navbar>
         <React.Fragment>
         <NavItem>
           <Link to='/admin/dashboard'>
           <NavLink style={{cursor:"pointer"}} >Home</NavLink>
           </Link> 
         </NavItem>
         <NavItem>
           <Link to='/admin/messages'>
           <NavLink style={{cursor:"pointer"}} >Messages</NavLink>
           </Link> 
         </NavItem>
         <NavItem>
           <Link to='/admin/List-Users'>
           <NavLink style={{cursor:"pointer"}} >User</NavLink>
           </Link> 
         </NavItem>
         <NavItem>
           <Link to='/admin/companies'>
           <NavLink style={{cursor:"pointer"}} >Companies</NavLink>
           </Link> 
         </NavItem>
         <NavItem>
           <Link to='/admin/interviewers'>
           <NavLink style={{cursor:"pointer"}} >Interviewers</NavLink>
           </Link> 
         </NavItem>
         <NavItem>
           <Link to='/admin/jobs'>
           <NavLink style={{cursor:"pointer"}} >Jobs</NavLink>
           </Link> 
         </NavItem>

         <NavItem>
           <Link to='/admin/signin'>
           <NavLink style={{cursor:"pointer"}} onClick={()=>signout(()=>props.history.push('/admin/signin'))} >Signout</NavLink>
</Link> 
         </NavItem>
         
         </React.Fragment>
         
        </Nav>
   
     </Collapse>
   </Navbar>
  
  
    )
    }
    else{
     var home='/';
     if(isAuth()){
       if(isAuth().role===1){
         home='/users'
       }
       if(isAuth().role===2){
         home='/company'
       }
       if(isAuth().role===3){
         home='/interviewer'
       }
     }
      return(



        <Navbar color="white" light expand="md">
        <Link to="/">
        <NavbarBrand className='font-weight-bold' style={{cursor:"pointer"}}>JobFinder</NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <React.Fragment>
            <NavItem>
              <Link to={home}>
              <NavLink style={{cursor:"pointer"}} >Home</NavLink>
              </Link> 
            </NavItem>

            {isAuth() && isAuth().role===1 &&(

<NavItem>
<Link to='/searchJobs'>
<NavLink style={{cursor:"pointer"}} >Jobs</NavLink>
</Link> 
</NavItem>
         )}
             {isAuth() && isAuth().role===2 &&(
               <NavItem>
               <Link to='/jobs'>
               <NavLink style={{cursor:"pointer"}} >Jobs</NavLink>
               </Link> 
               </NavItem>
        )}
             {isAuth() && isAuth().role===3 &&(
                   <NavItem>
                   <Link to={`/account/${isAuth()._id}`}>
                   <NavLink style={{cursor:"pointer"}} >Account</NavLink>
                   </Link> 
                   </NavItem>
         )}

       
            <NavItem>
              <Link to='/whyUs'>
              <NavLink style={{cursor:"pointer"}} >Why Us</NavLink>
              </Link> 
            </NavItem>
          
            <NavItem>
              <Link to='/contactUs'>
              <NavLink style={{cursor:"pointer"}} >Contact Us</NavLink>
              </Link> 
            </NavItem>

             
            {!isAuth() &&(
                  <NavItem>
                  <Link to='/signin'>
                  <NavLink style={{cursor:"pointer"}} >SignIn</NavLink>
                  </Link> 
                </NavItem>
        )
  }
  
  
           {isAuth() &&(

<NavItem>
<Link to='/'>
<NavLink style={{cursor:"pointer"}} onClick={()=>signout(()=>props.history.push('/'))} >Signout</NavLink>
</Link> 
</NavItem>
)
  }
  

   

            </React.Fragment>
            
           </Nav>
      
        </Collapse>
      </Navbar>
     


      )
    }
  };
  
  

    return (
        <div>
       {setHeader()}
      </div>
    );
  
}

export default withRouter(Header);




