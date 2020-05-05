const express=require("express")
const router=express.Router()
const {viewTeam} =require("../actions/interviewer-function")

router.post("/team",viewTeam);
//router.post("/view",view);
// router.post("/cpreSignup",cpreSignup);
// router.post('/csignin',csignin);
module.exports=router;