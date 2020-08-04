
var mongoose =require('mongoose');
const crypto=require('crypto')
mongoose.set('debug',true);
mongoose.Promise=global.Promise;
const { ObjectId } = mongoose.Schema;
const Schema=mongoose.Schema;
const companyschema=new Schema({
  email:{
      type:String,
      required:true,
      unique:true,
      index:true

  },
   company:{
       type:String,
       unique:true,
       required:true,
     
      
   },

   website:{
      type:String,
      required:true,
     
  },
  hashed_password:{
   type:String,
   required:true
},
salt:String,
  foundedyear:{
     type : Number ,
     required:true
   },
   headquarter:{
      type : String,
      required:true
     },
     noOfEmployees:{
   type:Number,
   required:true,

  } ,
   stage:{
   type : String,
   required:true,
  },
 
role:{
   type:Number,
   default:2
},

});
companyschema.virtual('password')
.set(function(password){
   this._password=password
   this.salt=this.makeSalt()
   this.hashed_password=this.encryptPassword(password)
})
.get(function(){
   return this._password
})                                                                                                                                                                                                                                                                                                                                                                            
companyschema.methods={
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



const companies =mongoose.model('company',companyschema);

 module.exports={companies};
