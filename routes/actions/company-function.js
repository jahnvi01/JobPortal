const {companies}=require("../../database/company")
const {jobs}=require("../../database/jobs")
const {interviews}=require("../../database/interviews")
const jwt=require('jsonwebtoken')
const expressJwt=require('express-jwt')
const _ = require('lodash');
const mongoose=require("mongoose")
var ObjectId = mongoose.Types.ObjectId;
JWT_ACCOUNT_ACTIVATION=require('../../config/keys').JWT_COMPANY_ACTIVATION;
APIKEY=require('../../config/keys').EMAIL_API;
exports.cpreSignup = (req, res) => {
    const { email,company,website, password,foundedyear,headquarter,noOfEmployees,stage } = req.body;
    companies.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
        
        const token = jwt.sign({ email,company,website, password,foundedyear,headquarter,noOfEmployees,stage }, JWT_ACCOUNT_ACTIVATION, { expiresIn: '1000m' });

        var request = require("request");

        var options = {
          method: 'POST',
          url: 'https://api.sendinblue.com/v3/smtp/email',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': APIKEY
          },
          body: `{"sender":{"name":"job-portal","email":"jbdalwadi01@gmail.com"},"to":[{"email":"${email}","name":"${company}"}],"replyTo":{"email":"${email}","name":"${company}"},"htmlContent":"http://localhost:3000/company-signup/${token}","subject":"verification-email"}`
        };
       
        
        request(options, function (error, response, body) {
          if (error) throw new Error(console.log(error));
                   return res.json({
                message: `Email has been sent to ${email}. Follow the instructions to activate your account.`
            });
        });
    });
};





exports.csignup = (req, res) => {
    const token = req.body.token;
    if (token) {
        jwt.verify(token, JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
            if (err) {
                console.log(err)
                return res.status(401).json({
                
                    error: err
                });
               
            }

            const { email,company,website, password,foundedyear,headquarter,noOfEmployees,stage } = jwt.decode(token);
const verify=1;
        

            const cmp = new companies({ email,company,website, password,foundedyear,headquarter,noOfEmployees,stage,verify});
            cmp.save((err, user) => {
                if (err) {
                    console.log(err)
                    return res.status(401).json({
                        error: err
                    });
                }
                return res.json({
                    message: 'Singup success! Please signin',
                    user,token
                });
            });
        });
    } else {
        return res.json({
            message: 'Something went wrong. Try again'
        });
    }
};

exports.csignin=(req,res)=>{
       
    const {email,password}=req.body;
    companies.findOne({email}).exec((err,user)=>{
if(err||!user){
    return res.status(400).json({
        error:"No company exists with this email"
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
    message:"signin successful",
    token,
    user
})
})
// res.json({msg:"hi"}) 
    }



exports.postJob= (req, res) => {

    var company=req.body.company;
    var salary = req.body.salary;
    var jobrole = req.body.jobrole;
    var location = req.body.location;
    var skills=req.body.skills;
    var description=req.body.description;

    
 
        if (location) {
            //categories=categories.toString();
            let array2 = location && location.toString().split(',');
            location = array2
        }
        if (skills) {
            //categories=categories.toString();
            let array3= skills && skills.toString().split(',');
           skills = array3
        }
    

        const job = new jobs({ company,jobrole,description,salary,skills,location});
        job.save((err, post) => {
            if (err) {
                return res.status(401).json({
                    error: err
                });
            }
            return res.json({
                message: 'Job Posted Successfully',
                post
            });
        });
  

};



exports.updateDetails= (req, res) => {
    const { _id,email,company,website, password,foundedyear,headquarter,noOfEmployees,stage } = req.body;
 

    companies.findById({_id}).exec((err,comp)=>{
     comp = _.merge(comp, {email,company,website,password,foundedyear,headquarter,noOfEmployees,stage});
console.log(comp)
        comp.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });

              
        }
        return res.json({
            message:"profile update successful",  
            });
    });
})
  

};


exports.companyDetails= (req, res) => {
    const _id = req.body._id;
 

    companies.findById({_id}).exec((err,comp)=>{

     
            if (err) {
                return res.status(400).json({
                    error: err
                });

              
        }
        return res.json(comp);

})
  

};


exports.jobs= (req, res) => {
    const company = req.body.company;
 

    jobs.find({company}).exec((err,comp)=>{

     
            if (err) {
                return res.status(400).json({
                    error: err
                });

              
        }
        return res.json(comp);

})
  

};

exports.candidates=(req,res)=>{
    var _id=req.body._id
    
interviews.find({job:ObjectId(_id),interviewDone:1,selected:1})

.populate('applicant','_id email fullname contact')
.populate('job','_id company')
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




                
 exports.candidatesDetails=(req,res)=>{
    var {jobId,applicantId}=req.body;

    
interviews.find({job:ObjectId(jobId),applicant:ObjectId(applicantId)})

.populate('applicant','_id email fullname contact skills education pastEmployment achievements yearsOfExperience')
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

exports.companyInterview=(req,res)=>{
            var {_id,jobId,applicantId,companyInterview,jobSelection}=req.body;
        
            jobSelection=parseInt(jobSelection, 10)
            companyInterview=parseInt(companyInterview, 10)
        interviews.findOneAndUpdate({interviewer:ObjectId(_id),job:ObjectId(jobId),applicant:ObjectId(applicantId),$set: { "companyInterview" : companyInterview, "jobSelection" : jobSelection }})
       
         .exec((err, interview) => {
                if (err) {
                    return res.json({
                        error: err
                    });
                }
                return res.json({
                   message:"Sent to Admin",
                   interview
                });
                               
              })
            
                  }
      


