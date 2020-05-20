
var mongoose =require('mongoose');
const crypto=require('crypto')
mongoose.set('debug',true);
mongoose.Promise=global.Promise;
const { ObjectId } = mongoose.Schema;
const Schema=mongoose.Schema;
const interviewschema=new Schema({

    interviewer:{
type:ObjectId,
ref:'interviewers',
required:true
    },
    applicant:{
        type:ObjectId,
        ref:'users',
        required:true
            },
            job:{
                type:ObjectId,
                ref:'jobs',
                required:true
                    },


   timings:{
       type:String,
       required:true
   },

selected:{
    type:Number,
    default:0
},
companyInterview:{
    type:Number,
    default:0
},
interviewDone:{
    type:Number,
    default:0
},
jobSelection:{
    type:Number,
    default:0
},
credits:{
    type:Number,
    default:0  
}
});

const interviews =mongoose.model('interviews',interviewschema);

 module.exports={interviews};
