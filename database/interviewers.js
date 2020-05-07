var mongoose =require('mongoose');
const crypto=require('crypto');
const {companies}=require("./company");
mongoose.set('debug',true);
mongoose.Promise=global.Promise;
const { ObjectId } = mongoose.Schema;

const Schema=mongoose.Schema;
const interviewerschema=new Schema({
   email:{
      type:String,
      required:true,
      unique:true,
      index:true

  },
   fullname:{
       type:String,
       required:true,
      
   },

   contact:{
      type:String,
      required:true,
     
  },
  hashed_password:{
   type:String,
   required:true
},
salt:String,

company:{ type: String, required:true },
credits:{
type:Number,
default:0
},
timings:{
   type:String,
   default:"10:00 AM to 5:00 PM "
},
experience:{
   type:Number,
   default:0
},
 
role:{
   type:Number,
   default:3
   
},
});
interviewerschema.virtual('password')
.set(function(password){
   this._password=password
   this.salt=this.makeSalt()
   this.hashed_password=this.encryptPassword(password)
})
.get(function(){
   console.log(this._password+"pwd")
   return this._password
}) 
                                                                                                                                                                                                                                                                                                                                                                          
interviewerschema.methods={
authenticate:function(plainText){

return this.encryptPassword(plainText)==this.hashed_password;
   },
   encryptPassword:function(password){
   
if(!password) return ''
try{
return crypto 
.createHmac('sha1',this.salt)
.update(password)
.digest('hex');
}
catch(err){
return err;
}
   },
   makeSalt:function(){
      return Math.round(new Date().valueOf()*Math.random())+'';
          }
}



const interviewers=mongoose.model('interviewers',interviewerschema);

 module.exports={interviewers};
