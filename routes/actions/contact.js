
JWT_ACCOUNT_ACTIVATION=require('../../config/keys').JWT_ACCOUNT_ACTIVATION;
APIKEY=require('../../config/keys').EMAIL_API;
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
          body: `{"sender":{"name":"${name}","email":"${email}"},"to":[{"email":"jbdalwadi01@gmail.com","name":"JobFinder"}],"replyTo":{"email":"jbdalwadi01@gmail.com","name":"JobFinder"},"htmlContent":"From:${name}  Message: ${message}","subject":"Message from user"}`
        };
       
        
        request(options, function (error, response, body) {
          if (error) {
            return res.json({
               error:error
            });     
          }
                   return res.json({
                message: `Mesaage has been sent to company.`,
                response,body
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
        body: `{"sender":{"name":"${name}","email":"${email}"},"to":[{"email":"jbdalwadi01@gmail.com","name":"JobFinder"}],"replyTo":{"email":"jbdalwadi01@gmail.com","name":"JobFinder"},"htmlContent":"From:${name}  Message: ${message}","subject":"Message from company"}`
      };
     
      
      request(options, function (error, response, body) {
        if (error) {
          return res.json({
             error:error
          });     
        }
                 return res.json({
              message: `Mesaage has been sent to company.`,
              response,body
          });
      });


};

