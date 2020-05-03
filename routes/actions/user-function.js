const {users,educations,employments}=require("../../database/users")
const jwt=require('jsonwebtoken')
const expressJwt=require('express-jwt')
const _ = require('lodash');
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
    const achievements = req.body.achievement;
    const skills=req.body.skills
    console.log(education)
    console.log(pastEmployment)
    users.findOne({email}).exec((err,user)=>{
        user = _.merge(user, {salary,jobrole,location,education,pastEmployment,yearsOfExperience,achievements});
        if (jobrole) {
            //categories=categories.toString();
            let array = jobrole && jobrole.toString().split(',');
            user.jobrole = array
        }
        if (location) {
            //categories=categories.toString();
            let array = location && location.toString().split(',');
            user.location = array
        }
        if (skills) {
            //categories=categories.toString();
            let array = skills && skills.toString().split(',');
            user.skills = array
        }
    
        // if (education) {
        //     //categories=categories.toString();
        //     let array = education && education.toString().split(',');
        //     user.education = array
        // }
        // if (pastEmployment) {
        //     //categories=categories.toString();
        //     let array = pastEmployment && pastEmployment.toString().split(',');
        //     user.pastEmployment = array
        // }
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
    const email = req.body.email;
    users.findOne({ email })
    .populate('educations', 'name startYear endYear course')
    .populate('employments', 'companyName startYear endYear companyRole')
        //.select('fullname contact jobrole location salary education pastEmployment yearsOfExperience skills achievements')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: err
                });
            }
            return res.json(data);
        });
};


