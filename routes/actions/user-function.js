const {users}=require("../../database/users")
const jwt=require('jsonwebtoken')
const expressJwt=require('express-jwt')
const _ = require('lodash');


exports.signup=(req,res)=>{
   
    
    const {fullname,email,contact,password}=req.body;
    users.findOne({email}).exec((err,user)=>{
if(user){
    return res.status(400).json({
        error:"user already exists"
    })
}
else{

let newuser=new users({email,fullname,contact,password})
newuser.save()
.then(user=>{
    res.json({user});
})

}

})
    
    };



exports.signin=(req,res)=>{
       
    const {email,password}=req.body;
    users.findOne({email}).exec((err,user)=>{
if(err||!user){
    return res.status(400).json({
        error:"No user exists with this email"
    })
}

if(!user.authenticate(password)){
    return res.status(400).json({
        error:"Enter valid password"
    })
}
const token=jwt.sign({_id:user._id},'secretkey',{expiresIn:'1d'})
res.cookie('token',token,{expiresIn:'1d'})
console.log(user);
return res.json({
    token,
    user
})
})
// res.json({msg:"hi"}) 
    }

exports.signout=(req,res)=>{
   res.clearCookie('token');
 return res.json({message:"Signout success"})
};

exports.requireSignin= expressJwt({
       
    secret: 'secretkey'
});

