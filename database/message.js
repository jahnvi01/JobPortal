
var mongoose =require('mongoose');
mongoose.set('debug',true);
mongoose.Promise=global.Promise;
const { ObjectId } = mongoose.Schema;
const Schema=mongoose.Schema;
const messageschema=new Schema({
    company:{
        type:String,
        default:""
    },
   email:{
       type:String,
       default:""
   },
   message:{
    type:String
},
}, { timestamps: true });

const messages =mongoose.model('messages',messageschema);

 module.exports={messages};
