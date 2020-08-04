const express=require("express")
const router=express.Router()
const {signup,signin,preSignup,googleSignup,signout,requireSignin} =require("../actions/user-function")
const {intsignup,intsignin,intpreSignup,intgoogleSignup} =require("../actions/interviewer-function")
const {csignup,csignin,cpreSignup,cgooglepreSignup,cGooglesignup} =require("../actions/company-function")
// user signup
router.post("/usersignup",signup);
router.post("/userpreSignup",preSignup);
router.post("/googleSignup",googleSignup);
router.post('/usersignin',signin);
router.get('/usersignout',signout);

//interviewer signup
router.post("/intsignup",intsignup);
router.post("/intpreSignup",intpreSignup);
router.post('/intsignin',intsignin);
router.post("/intgoogleSignup",intgoogleSignup);
//company signup
router.post("/csignup",csignup);
router.post("/cpreSignup",cpreSignup);
router.post("/cgoogleSignup",cgooglepreSignup);
router.post("/companySignup",cGooglesignup);
router.post('/csignin',csignin);
module.exports=router;