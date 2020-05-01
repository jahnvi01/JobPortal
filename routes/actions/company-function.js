const {companies}=require("../../database/company")
const jwt=require('jsonwebtoken')
const expressJwt=require('express-jwt')
const _ = require('lodash');
JWT_ACCOUNT_ACTIVATION=require('../../config/keys').JWT_COMPANY_ACTIVATION;

exports.cpreSignup = (req, res) => {
    const { c_email,company,website, password,foundedyear,c_location,noOfEmployees,stage } = req.body;
    companies.findOne({ c_email: c_email.toLowerCase() }, (err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
        
        const token = jwt.sign({ c_email,company,website, password,foundedyear,c_location,noOfEmployees,stage }, JWT_ACCOUNT_ACTIVATION, { expiresIn: '1000m' });

        var request = require("request");

        var options = {
          method: 'POST',
          url: 'https://api.sendinblue.com/v3/smtp/email',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': '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'
          },
          body: `{"sender":{"name":"job-portal","email":"jbdalwadi01@gmail.com"},"to":[{"email":"${c_email}","name":"${company}"}],"replyTo":{"email":"${c_email}","name":"${company}"},"htmlContent":"${token}","subject":"verification-email"}`
        };
       
        
        request(options, function (error, response, body) {
          if (error) throw new Error(console.log(error));
                   return res.json({
                message: `Email has been sent to ${c_email}. Follow the instructions to activate your account.`
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
    //             message: `Email has been sent to ${c_email}. Follow the instructions to activate your account.`
    //         });
    //     });
    });
};




// exports.signup=(req,res)=>{
   
    
//     const {fullname,email,contact,password}=req.body;
//     cerviewers.findOne({c_email}).exec((err,user)=>{
// if(user){
//     return res.status(400).json({
//         error:"user already exists"
//     })
// }
// else{

// let newuser=new cerviewers({email,fullname,contact,password})
// newuser.save()
// .then(user=>{
//     res.json({user});
// })

// }

// })
    
//     };

exports.csignup = (req, res) => {
    const token = req.body.token;
    if (token) {
        jwt.verify(token, JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    error: err
                });
               
            }

            const { c_email,company,website, password,foundedyear,c_location,noOfEmployees,stage } = jwt.decode(token);

        

            const cmp = new companies({ c_email,company,website, password,foundedyear,c_location,noOfEmployees,stage});
            cmp.save((err, user) => {
                if (err) {
                    return res.status(401).json({
                        error: err
                    });
                }
                return res.json({
                    message: 'Singup success! Please signin'
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
       
    const {c_email,password}=req.body;
    companies.findOne({c_email}).exec((err,user)=>{
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
    token,
    user
})
})
// res.json({msg:"hi"}) 
    }

exports.csignout=(req,res)=>{
   res.clearCookie('token');
 return res.json({message:"Signout success"})
};



