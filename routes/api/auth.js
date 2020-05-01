const express=require("express")
const router=express.Router()
const {signup,signin,preSignup,requireSignin} =require("../actions/user-function")
const {intsignup,intsignin,intpreSignup} =require("../actions/interviewer-function")
const {csignup,csignin,cpreSignup} =require("../actions/company-function")
// user signup
router.post("/usersignup",signup);
router.post("/userpreSignup",preSignup);
router.post('/usersignin',signin);

//interviewer signup
router.post("/intsignup",intsignup);
router.post("/intpreSignup",intpreSignup);
router.post('/intsignin',intsignin);

//company signup
router.post("/csignup",csignup);
router.post("/cpreSignup",cpreSignup);
router.post('/csignin',csignin);
module.exports=router;