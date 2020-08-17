
JWT_ACCOUNT_ACTIVATION=require('../../config/keys').JWT_ACCOUNT_ACTIVATION;
const {messages} =require('../../database/message');
APIKEY=require('../../config/keys').EMAIL_API;
EMAIL=require('../../config/keys').EMAIL;
exports.contact = (req, res) => {
    const { name, email,message } = req.body;

              var request = require("request");

        var options = {
          method: 'POST',
          url: 'https://api.sendinblue.com/v3/smtp/email',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': APIKEY
          },
          body: `{"sender":{"name":"${name}","email":"${email}"},"to":[{"email":${EMAIL},"name":"TechHire"}],"replyTo":{"email":${EMAIL},"name":"TechHire"},"htmlContent":"From:${name}  Message: ${message}","subject":"Message from user"}`
        };
       
        
        request(options, function (error, response, body) {
          if (error) {
            return res.json({
               error:error
            });     
          }
               
          
                
                            const msg = new messages({  email,message });
                            msg.save((err, user) => {
                                if (err) {
                                    return res.status(401).json({
                                        error: err
                                    });
                                }
                                return res.json({
                                  message: `Mesaage has been sent to company.`,
                
                                    
                                });
                        
                        });
                    
        });

 
};

exports.feedback = (req, res) => {
  const { name, email,message } = req.body;

            var request = require("request");

      var options = {
        method: 'POST',
        url: 'https://api.sendinblue.com/v3/smtp/email',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': APIKEY
        },
        body: `{"sender":{"name":"${name}","email":"${email}"},"to":[{"email":${EMAIL},"name":"TechHire"}],"replyTo":{"email":${EMAIL},"name":"TechHire"},"htmlContent":"From:${name}  Message: ${message}","subject":"Message from company"}`
      };
     
      
      request(options, function (error, response, body) {
        if (error) {
          return res.json({
             error:error
          });     
        }
        const msg = new messages({  email,message });
        msg.save((err, user) => {
            if (err) {
                return res.status(401).json({
                    error: err
                });
            }
            return res.json({
              message: `Mesaage has been sent.`,

                
            });
    
    });
      });


};

