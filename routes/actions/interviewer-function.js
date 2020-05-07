const {interviewers}=require("../../database/interviewers")
const {interviews}=require("../../database/interviews")
const {companies}=require("../../database/company")
const jwt=require('jsonwebtoken')
const expressJwt=require('express-jwt')
const _ = require('lodash');
const mongoose=require("mongoose")
var ObjectId = mongoose.Types.ObjectId;
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
      
    
        interviewers.find({})
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


        exports.view=(req,res)=>{
      var _id=req.body._id
    
            interviewers.findById({_id})
                       .exec((err,user)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        
        
        return res.json({user})
        })
      
            }


            exports.update= (req, res) => {
                const { _id,email,company,fullname,contact, password,timings,experience } = req.body;
             
            
                interviewers.findById({_id}).exec((err,interviewer)=>{
                    if (err) {
                        return res.status(400).json({
                            error: err
                        });
                    }
                    interviewer = _.merge(interviewer, {email,company,fullname,contact, password,timings,experience });
            console.log(interviewer)
                    interviewer.save((err, result) => {
                        if (err) {
                            return res.status(400).json({
                                error: err
                            });
            
                          
                    }
                    return res.json({
                        message:"Account update successful",  
                        result});
                });
            })
        }



        exports.interviews=(req,res)=>{
            var _id=req.body._id
          
            
        interviews.find({interviewer:ObjectId(_id)})
        .populate('interviewer','_id timings')
        .populate('applicant','_id email fullname')
        .populate('job','_id company jobrole skills')
        .exec((err, interview) => {
                if (err) {
                    return res.json({
                        error: err
                    });
                }
               
               if(interview){
                return res.json(data); 
               }
        
              })
            
                  }
      
