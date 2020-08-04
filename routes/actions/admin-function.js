const {users}=require("../../database/users")
const {jobs} =require('../../database/jobs');
const {messages} =require('../../database/message');
const {interviews} =require('../../database/interviews');
const {interviewers} =require('../../database/interviewers');
const {companies} =require('../../database/company');
const jwt=require('jsonwebtoken')
const _ = require('lodash');
const mongoose=require("mongoose")
var ObjectId = mongoose.Types.ObjectId;
JWT_ACCOUNT_ACTIVATION=require('../../config/keys').JWT_ACCOUNT_ACTIVATION;
APIKEY=require('../../config/keys').EMAIL_API;
const a_username=require('../../config/keys').ADMIN_USERNAME;
const a_password=require('../../config/keys').ADMIN_PASSWORD;
exports.admin_signin=(req,res)=>{
       
    const {username,password}=req.body;
   
if(username!==a_username){
    return res.status(400).json({
        error:"wrong username"
    })
}

if(password!==a_password){
    return res.status(400).json({
        error:"wrong password"
    })
}

const token=jwt.sign({_id:username+password},JWT_ACCOUNT_ACTIVATION,{expiresIn:'1d'})
res.cookie('token',token,{expiresIn:'1d'})
const user={
    username:username,
    role:4
}
return res.json({
    message:"signin successful",
    user,
    token
})

    }



    exports.getData = (req, res) => {
  
        users.find({},{$limit:5})
        .sort({_id:1})

            .select('fullname contact email')
            .exec((err, users) => {
                if (err) {
                    return res.json({
                        error: err
                    });
                }

                companies.find({},{$limit:5})
                .sort({_id:1})
                .select('_id email company website headquarter')
                .exec((err,company)=>{
                    if(err){
                        return res.status(400).json({
                            error:err
                        })
                    }
                    
                    interviewers.find({},{$limit:5})
                    .sort({_id:1})
                    .select('_id email fullname contact')
                    .exec((err,team)=>{
                if(err){
                    return res.status(400).json({
                        error:err
                    })
                }
                
                
                return res.json({users,company,team})
                })  
                  
                    })

               
            });
    };

exports.getUsers = (req, res) => {
  
    users.find({})
    // .populate('educations', '_id name startYear endYear course')
    // .populate('employments', '_id companyName startYear endYear companyRole')
        .select('fullname contact email')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: err
                });
            }
            return res.json(data);
        });
};

exports.getCompanies = (req, res) => {
 
    companies.find({}).exec((err,company)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        
        
        return res.json(company)
        })
  

        }
    




        exports.getApplicants = (req, res) => {
  var _id=req.body._id;
            jobs.findById({_id})
             .populate('applications', '_id fullname email contact')
            // .populate('employments', '_id companyName startYear endYear companyRole')
         .select('_id company applications')
                .exec((err, data) => {
                    if (err) {
                        return res.json({
                            error: err
                        });
                    }
                                
        
                    interviews.find({job:ObjectId(_id)})
                    .populate('interviewer','_id email timings')
                    .exec((err, interview) => {
                            if (err) {
                                return res.json({
                                    error: err
                                });
                            }
                           
                           if(interview){
                            return res.json({data,interview}); 
                           }
                           
                                 

                    return res.json({data,interview:[]});
                              })
                     


                });
        };
        
        exports.scheduleInterview = (req, res) => {
            var email=req.body.email;
            var jobId=req.body.jobId;
            var applicantId=req.body.applicantId;
           

                      interviewers.findOne({email})
                      .exec((err, data) => {
                              if (err) {
                                  return res.json({
                                      error: err
                                  });
                              }
                             
                              if(!data){
                                return res.json({
                                    error: "Interviewer not found"
                                });   
                              }
                              else{
                                var timings=data.timings
                                const interview=new interviews({
                                    interviewer:data._id,
                                    applicant:applicantId,
                                    job:jobId,
                                    timings:timings
                                })
                                interview.save((err,result)=>{
                                    if(err){
                                        return res.json({
                                            error: "Interviewer not found"
                                        });   
                                    }
                                    return res.json({
                                        message:"Successfully Assigned",
                                        result}); 
                                })
                              }
                          });
                  };

         exports.getSchedule = (req, res) => {
                     
                               
                          };
        
    exports.interviewStatus=(req,res)=>{
                            var {jobId,applicantId}=req.body;
                        
                            
                        interviews.find({job:ObjectId(jobId),applicant:ObjectId(applicantId)})
                       
                        .populate('interviewer','_id email fullname contact')
                        
                        .exec((err, interview) => {
                                if (err) {
                                    return res.json({
                                        error: err
                                    });
                                }
                               
                               if(interview){
                                return res.json(interview); 
                               }
                               
                        
                              })
                            
                                  }
       exports.credits=(req,res)=>{
                                    var {job,credits,applicant,interviewer}=req.body;
                                
                                    var credits=parseInt(credits, 10)
                                    
                                interviews.findOneAndUpdate({interviewer:ObjectId(interviewer),job:ObjectId(job),applicant:ObjectId(applicant),$set: { "credits":credits }})
                               
                                 .exec((err, interview) => {
                                        if (err) {
                                            return res.json({
                                                error: err
                                            });
                                        }
                                      interviewers.findOneAndUpdate({_id:ObjectId(interviewer), $inc: { credits: credits } })  
                                     
                                      
                                 .exec((err, result) => {
                                    if (err) {
                                        return res.json({
                                            error: err
                                        });
                                    }
                                       return res.json({
                                           message:"Credited to interviewer account",
                                       
                                        });
                                })
                                   
                                                       
                                      })
                                    
                                          }
         exports.getApplications = (req, res) => {
                                            var _id=req.body._id;
                                            var info=[]; 
                                                      users.findById({_id})
                                                       .populate('applications', '_id company jobrole salary')
                                                      // .populate('employments', '_id companyName startYear endYear companyRole')
                                                   .select('_id applications')
                                                          .exec((err, data) => {
                                                              if (err) {
                                                                  return res.json({
                                                                      error: err
                                                                  });
                                                              }
                                                                var array=[]
                                                             data.applications=data.applications.map(application=>array.push(application._id))                   
                                            console.log(array)
                                                    interviews.find({job:{$in:array},applicant:ObjectId(_id)})
                                                    .populate('interviewer','_id email timings')
                                                    .exec((err, interview) => {
                                                            if (err) {
                                                                return res.json({
                                                                    error: err
                                                                });
                                                            }
                                                           
                                                           if(interview){
                                                            return res.json({data,interview});
                                                          }
                                                          else{
                                                            return res.json({data,interview:[]}); 
                                                          }
                                                           
                                                             
                                                  })
                                                                           
                                                      });
                                                  };
                                                  
                                                  exports.message = (req, res) => {
                                                   var {company,email,message}=req.body
                                                if(!company){
                                                    company=""
                                                }
                                                if(!email){
                                                    email=""
                                                }
                                                            const msg = new messages({  company,email,message });
                                                            msg.save((err, user) => {
                                                                if (err) {
                                                                    return res.status(401).json({
                                                                        error: err
                                                                    });
                                                                }
                                                                return res.json({
                                                                    message: 'Sent',
                                                                    
                                                                });
                                                        
                                                        });
                                                    
                                                };
                                                                                              
                                                exports.getMessages = (req, res) => {
 
                                                    messages.find({})
                                                    .sort({createdAt:1})
                                                    .exec((err,message)=>{
                                                        if(err){
                                                            return res.status(400).json({
                                                                error:err
                                                            })
                                                        }
                                                        
                                                        
                                                        return res.json(message)
                                                        })
                                                  
                                                
                                                        }