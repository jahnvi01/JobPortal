const {users,educations,employments}=require("../../database/users")
const {jobs} =require('../../database/jobs');
const {companies} =require('../../database/company');
const jwt=require('jsonwebtoken')
const expressJwt=require('express-jwt')
const _ = require('lodash');
const mongoose=require("mongoose")
const formidable=require('formidable')
var ObjectId = mongoose.Types.ObjectId;



JWT_ACCOUNT_ACTIVATION=require('../../config/keys').JWT_ACCOUNT_ACTIVATION;
APIKEY=require('../../config/keys').EMAIL_API;
exports.preSignup = (req, res) => {
    const { fullname, email,contact, password } = req.body;
    users.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
        
        const token = jwt.sign({ fullname, email, contact,password }, JWT_ACCOUNT_ACTIVATION, { expiresIn: '1000m' });

        var request = require("request");

        var options = {
          method: 'POST',
          url: 'https://api.sendinblue.com/v3/smtp/email',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': APIKEY
          },
          body: `{"sender":{"name":"job-portal","email":"jbdalwadi01@gmail.com"},"to":[{"email":"${email}","name":"${fullname}"}],"replyTo":{"email":"${email}","name":"${fullname}"},"htmlContent":"http://localhost:3000/user-signup/${token}","subject":"verification-email"}`
        };
       
        
        request(options, function (error, response, body) {
          if (error) throw new Error(console.log(error));
                   return res.json({
                message: `Email has been sent to ${email}. Follow the instructions to activate your account.`
            });
        });

    //     const emailData = {
    //         from: process.env.EMAIL_FROM,
    //         to: email,
    //         subject: `Account activation link`,
    //         html: `
    //         <p>Please use the following link to activate your acccount:</p>
    //         <p>${process.env.CLIENT_URL}/auth/account/${token}</p>
    //         <hr />
    //         <p>This email may contain sensetive information</p>
    //         <p>https://seoblog.com</p>
    //     `
    //     };

    //     sgMail.send(emailData).then(sent => {
    //         return res.json({
    //             message: `Email has been sent to ${email}. Follow the instructions to activate your account.`
    //         });
    //     });
    });
};




// exports.signup=(req,res)=>{
   
    
//     const {fullname,email,contact,password}=req.body;
//     users.findOne({email}).exec((err,user)=>{
// if(user){
//     return res.status(400).json({
//         error:"user already exists"
//     })
// }
// else{

// let newuser=new users({email,fullname,contact,password})
// newuser.save()
// .then(user=>{
//     res.json({user});
// })

// }

// })
    
//     };

exports.signup = (req, res) => {
    const token = req.body.token;
    if (token) {
        jwt.verify(token, JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    error: 'Expired link. Signup again'
                });
               
            }

            const { fullname, email, contact, password } = jwt.decode(token);

            const verify=1;

            const user = new users({  email,fullname,contact, password,verify });
            user.save((err, user) => {
                if (err) {
                    return res.status(401).json({
                        error: err
                    });
                }
                return res.json({
                    message: 'Singup successful!',
                    user,
                    token
                });
            });
        });
    } else {
        return res.json({
            error: 'Something went wrong. Try again'
        });
    }
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
const token=jwt.sign({_id:user._id},JWT_ACCOUNT_ACTIVATION,{expiresIn:'1d'})
res.cookie('token',token,{expiresIn:'1d'})
console.log(user);
return res.json({
    message:"signin successful",
    user,
    token
})
})
// res.json({msg:"hi"}) 
    }

exports.signout=(req,res)=>{
   res.clearCookie('token');
 return res.json({message:"Signout success"})
};

exports.requireSignin= expressJwt({
       
    secret: JWT_ACCOUNT_ACTIVATION
});


exports.profile= (req, res) => {

    const email=req.body.email;
    const salary = req.body.salary;
    const jobrole = req.body.jobrole;
    const location = req.body.location;
    const education = req.body.education;
    const pastEmployment = req.body.pastEmployment;
    const  yearsOfExperience= req.body.yearsOfExperience;
    const achievements = req.body.achievements;
    const skills=req.body.skills;
const fileName=req.body.fileName;
const filePath=req.body.filePath;
console.log(fileName)
    users.findOne({email}).exec((err,user)=>{
     user = _.merge(user, {salary,yearsOfExperience,achievements});
      user.set(salary,parseInt(salary, 10));
      user.set(jobrole,[]);
      user.set(location,[]);
       console.log(education)
     user.set(education,[]);
      user.set(pastEmployment,[]);
     
      user.set(yearsOfExperience,parseInt(yearsOfExperience, 10));
      user.set(skills,[]);
      user.set(filePath,filePath);
      user.set(fileName,fileName);
      user.set(achievements,achievements);
     user.education=[];
      user.pastEmployment=[];
      user.jobrole=[];
      user.skills=[];
      user.location=[];
  var photo={data:"",contentType:""}

user.fileName=fileName;
user.filePath=filePath;

      user.set(photo,photo)
      user.photo=photo
        if (jobrole) {
            //categories=categories.toString();
            let array1 = jobrole && jobrole.toString().split(',');
            user.jobrole = array1
        }
        if (location) {
            //categories=categories.toString();
            let array2 = location && location.toString().split(',');
            user.location = array2
        }
        if (skills) {
            //categories=categories.toString();
            let array3= skills && skills.toString().split(',');
            user.skills = array3
        }
    
        if (education && education!==null) {
            var length=education.length;
            user.education=education;
         
//             for(var i=0;i<user.education.length;i++){
//                 user.education.pop(1);
//                 console.log("pop")
//             } 
// for(var i=0;i<length;i++){
//     user.education.push(education[i]);
// }   

         
       }
        if (pastEmployment && pastEmployment!==null) {
            var length=education.length;
            user.pastEmployment=pastEmployment;
            // for(var i=0;i<length;i++){
            //     user.pastEmployment.push(pastEmployment[i]);
            // }  
          
        }
       
         console.log(user)
        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });

              
        }
        return res.json({
            message:"profile update successful",  
            result});
    });
})
  

};


exports.view = (req, res) => {
    const _id = req.body._id;
    users.findById({ _id })
    .populate('educations', '_id name startYear endYear course')
    .populate('employments', '_id companyName startYear endYear companyRole')
       .select('_id email fullname contact jobrole location salary education pastEmployment yearsOfExperience skills achievements fileName filePath')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: err
                });
            }
            jobs.find({})
            .select('_id location company jobrole salary createdAt')
            .sort({createdAt:-1})
            .limit(5)
            .exec((err,job)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        
        
        return res.json({job,data})
        })


        });
};


exports.jobs=(req,res)=>{
       
    
    jobs.find({})
    .select('_id location company jobrole salary createdAt')
    .exec((err,job)=>{
if(err){
    return res.status(400).json({
        error:err
    })
}


return res.json(job)
})

    }



    exports.viewJob=(req,res)=>{
       var _id=req.body._id;
    console.log(_id+"idddid");
        jobs.findById(_id)
         .select('_id skills location company jobrole description salary createdAt')
        .exec((err,job)=>{
    if(err){
        return res.status(400).json({
            error:err
        })
    }
    
    
    companies.findOne({company:job.company}).exec((err,company)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        
        
        return res.json({job,company})
        })
    })

        }
    
    
exports.apply= (req, res) => {

        const jobId = req.body.jobId;
    const userId = req.body.userId;
  
    

    jobs.findById({_id:jobId}).exec((err,job)=>{
var checkId=job.applications.toString();
       if(checkId.includes(userId)){
        return res.status(400).json({
            error: "Already Applied"
        })  
       }
job.applications.push(userId);
var applications=job.applications;
        if (applications) {
            //categories=categories.toString();
            let array1 = applications && applications.toString().split(',');
            job.applications = array1
        }
        
     console.log(job);
    
        job.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });

              
        }
        users.findById({_id:userId}).exec((err,user)=>{
           
            user.applications.push(jobId);
            var applications=user.applications;
                    if (applications) {
                        //categories=categories.toString();
                        let array1 = applications && applications.toString().split(',');
                        user.applications = array1
                    }
                                   
                    user.save((err, data) => {
                        if (err) {
                            return res.status(400).json({
                                error: err
                            });
            
                          
                    }
                    return res.json({
                        message:"Application successful",  
                        });
                });
            })
              
            
    });
})
  

};
exports.resume = (req, res) => {
    const _id = req.body._id
    users.findById({_id })
        .select('photo')
        .exec((err, user) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            // let stream = new Duplex();
            // // stream.push(user.photo.data);
            // stream.push(user.photo.data);
            // stream.push(null);
            // console.log(stream)
            // res.set('Content-Type', "application/pdf");
          
          return res.send(user.photo.data);
        //   res.header('Content-type', 'application/pdf');
        //   return stream.pipe(res)
        });
    };

exports.upload=(req,res)=>{

if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file=req.files.file;
console.log("jahnvi");
  var _id=req.body._id;
  var name=file.name.split('.');

  name=_id+"."+name[1]
  console.log(name)
  file.mv(`${__dirname}/../../client/public/uploads/${name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: name, filePath: `/uploads/${name}` });
  });
// const form= new formidable.IncomingForm()
// form.keepExtensions=true
// form.parse(req,(err,fields,files)=>{
//     if(err){
//         console.log(err)
//        return res.json({error:err})
//     }
//     console.log(files)
//     console.log(fields)
//     console.log("enterr")
//    return res.json({message:"uploaded"})
// })

}
