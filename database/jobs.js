
var mongoose =require('mongoose');
const crypto=require('crypto')
mongoose.set('debug',true);
mongoose.Promise=global.Promise;
const { ObjectId } = mongoose.Schema;
const Schema=mongoose.Schema;
const jobschema=new Schema({

   company:{
       type:String,
       required:true
   },
   jobrole:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
salary:{
    type:Number,
    required:true
},
skills:{
    type:Array,
    default:[],

},
location:{
    type:Array,
    default:[],

},
   applications: [{ type: ObjectId, ref: 'users'}],

}, { timestamps: true });

const jobs =mongoose.model('jobs',jobschema);

 module.exports={jobs};
