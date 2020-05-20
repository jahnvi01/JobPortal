import cookie from 'js-cookie';

export const setCookie=(key,value)=>{
   

        cookie.set(key,value,{expires:1})
    
};

export const removeCookie=(key)=>{
  

        cookie.remove(key,{expires:1})

};
export const getCookie=(key)=>{
    

     return   cookie.get(key)
  
};

export const setLocalStorage=(key,value)=>{
    
        localStorage.setItem(key,JSON.stringify(value))

};


export const removeLocalStorage=(key)=>{
  
        localStorage.removeItem(key)

};

export const authentication=(data,next)=>{
   console.log(data.user) 
   setCookie('token',data.token);
   setLocalStorage('user',data.user);
   next();
};

export const signout=(next)=>{
removeCookie('token');
removeLocalStorage('user');
next()
return fetch('/api/usersignout',{
    method:"GET",

})
.then(res=>{console.log("signout success")})
.catch(err=>console.log(err))
}

export const isAuth=(key)=>{
 
      const cookieChecked=getCookie('token');
      if(cookieChecked){
          if(localStorage.getItem('user')){
             
              return JSON.parse(localStorage.getItem('user'))
          }
          else{
              
              return false;
          }
      }
      else{
          return false;
      }
    
}
export const userAuth= function(props){

    if(!isAuth()){
        props.history.push('/user-signup')
    }
    
   else if(isAuth() && isAuth().role===2){
        props.history.push('/company')
    }
    else if(isAuth() && isAuth().role===3){
        props.history.push('/interviewer')
    }
    
}
export const companyAuth= function(props){

    if(!isAuth()){
        props.history.push('/company-signup')
    }
    
   else if(isAuth() && isAuth().role===1){
        props.history.push('/users')
    }
    else if(isAuth() && isAuth().role===3){
        props.history.push('/interviewer')
    }
    
}


export const interviewerAuth= function(props){

    if(!isAuth()){
        props.history.push('/interviewer-signup')
    }
    
   else if(isAuth() && isAuth().role===2){
        props.history.push('/company')
    }
    else if(isAuth() && isAuth().role===1){
        props.history.push('/users')
    }
    
}

export const adminAuth= function(props){

    if(!isAuth()){
        props.history.push('/admin/signin')
    }
    else if(isAuth() && isAuth().role===3){
        props.history.push('/interviewer')
    }   
   else if(isAuth() && isAuth().role===2){
        props.history.push('/company')
    }
    else if(isAuth() && isAuth().role===1){
        props.history.push('/users')
    }
    
}

 