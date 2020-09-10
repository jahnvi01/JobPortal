const express =require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const app=express();
const path=require('path');
const fileupload=require("express-fileupload")
const authroutes=require('./routes/api/auth')
const userroutes=require('./routes/api/users')
const interviewerroutes=require('./routes/api/interviewer')
const companyroutes=require('./routes/api/company')
const adminroutes=require('./routes/api/admin')
app.use(bodyParser())
app.use(fileupload())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users',userroutes)
app.use('/api',authroutes)
app.use('/api/interviewer',interviewerroutes)
app.use('/api/company',companyroutes)
app.use('/api/admin',adminroutes)
mongoURI=require('./config/keys').mongoURI;
mongoose.connect(mongoURI,{useNewUrlParser:true,useCreateIndex:true})
.then(()=>console.log("db connected"))
.catch(err=>console.log(err))
const port=process.env.PORT||5000;
//     app.use(express.static('client/build'));
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    
//     })


// var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
// var server_host = process.env.YOUR_HOST || '0.0.0.0';
// app.listen(server_port, server_host, function() {
//     console.log('Listening on port %d', server_port);
// });
app.listen(port,()=>console.log("Server connected to port 5000"))