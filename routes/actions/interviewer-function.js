const {interviewers}=require("../../database/interviewers")
const {companies}=require("../../database/company")
const jwt=require('jsonwebtoken')
const expressJwt=require('express-jwt')
const _ = require('lodash');
JWT_ACCOUNT_ACTIVATION=require('../../config/keys').JWT_INTERVIEWER_ACTIVATION;
APIKEY=require('../../config/keys').EMAIL_API;
exports.intpreSignup = (req, res) => {
    const { fullname, email,contact, password,company } = req.body;
    interviewers.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
        companies.findOne({ company }, (err, cmp) => {
if(err){
    return res.status(400).json({
        error: err
    });
}
      if(cmp){
        const token = jwt.sign({ fullname, email, contact,password ,company}, JWT_ACCOUNT_ACTIVATION, { expiresIn: '1000m' });

        var request = require("request");

        var options = {
          method: 'POST',
          url: 'https://api.sendinblue.com/v3/smtp/email',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': APIKEY
          },
          body: `{"sender":{"name":"job-portal","email":"jbdalwadi01@gmail.com"},"to":[{"email":"${email}","name":"${fullname}"}],"replyTo":{"email":"${email}","name":"${fullname}"},"htmlContent":"http://localhost:3000/interviewer-signup/${token}","subject":"verification-email"}`
        };
       
        
        request(options, function (error, response, body) {
          if (error) throw new Error(console.log(error));
                   return res.json({
                message: `Email has been sent to ${email}.... Follow the instructions to activate your account.`
            });
        });
    }
    else{
      return res.status(400).json({
          error: 'Company does not exist on this platform'
      });  
    }
})
    });
};





exports.intsignup = (req, res) => {
    const token = req.body.token;
    if (token) {
        jwt.verify(token, JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    error: 'Expired link. Signup again'
                });
               
            }

            const { fullname, email, contact, password ,company} = jwt.decode(token);
const verify=1;
           

            const user = new interviewers({  email,fullname,contact, password ,company,verify});
            user.save((err, user) => {
                if (err) {
                    return res.status(401).json({
                        error: err
                    });
                }
                return res.json({
                    message: 'Singup success! Please signin',
                    user,
                    token
                });
            });
        });
    } else {
        return res.json({
            message: 'Something went wrong. Try again'
        });
    }
};

exports.intsignin=(req,res)=>{
       
    const {email,password}=req.body;
    interviewers.findOne({email}).exec((err,user)=>{
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
const token=jwt.sign({_id:user._id},JWT_ACCOUNT_ACTIVATION,{expiresIn:'1d'})
res.cookie('token',token,{expiresIn:'1d'})
console.log(user);
return res.json({
    message: 'Singin successful',
    token,
    user
})
})

    }


    exports.viewTeam=(req,res)=>{
       var company=req.body.company;
    
        interviewers.find({company})
        .select('_id email fullname contact')
        .exec((err,team)=>{
    if(err){
        return res.status(400).json({
            error:err
        })
    }
    
    
    return res.json(team)
    })
  
        }