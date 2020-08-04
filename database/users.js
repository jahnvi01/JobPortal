var mongoose =require('mongoose');
const crypto=require('crypto')
mongoose.set('debug',true);
mongoose.Promise=global.Promise;
const { ObjectId } = mongoose.Schema;

const Schema=mongoose.Schema;
const educationschema=new Schema({
name:{
   type:String
},
startYear:{
   type:Number
},
endYear:{
   type:Number

},
course:{
   type:String
  
},
})

const employmentschema=new Schema({
   companyName:{
      type:String
   },
   startYear:{
      type:Number
   },
   endYear:{
      type:Number
   
   },
   companyRole:{
      type:String
     
   },
   })
   

const userschema=new Schema({
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
      default:"Not Given"
  },
  hashed_password:{
   type:String,
   required:true
},
salt:String,
  jobrole:{
     type : Array ,
    default : []
   },
   location:{
      type : Array ,
      default : []
     },
salary:{
   type:Number,
    
},
education:[educationschema],
pastEmployment:[employmentschema],
  
     yearsOfExperience:{
   type:Number
  } ,
  skills:{
   type : Array ,
   default : []
  },
  achievements:{
   type : String
  },
fileName:{
   type : String
},
filePath:{
   type : String
},
role:{
   type:Number,
   default:1
},
applications: [{ type: ObjectId, ref: 'jobs'}],
verify:{
   type:Number,
   default:0  
}
});
userschema.virtual('password')
.set(function(password){
   this._password=password
   this.salt=this.makeSalt()
   this.hashed_password=this.encryptPassword(password)
})
.get(function(){
   return this._password
})                                                                                                                                                                                                                                                                                                                                                                            
userschema.methods={
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


const users=mongoose.model('users',userschema);
const educations=mongoose.model('educations',educationschema);
const employments=mongoose.model('employments',employmentschema);


 module.exports={users,educations,employments};
