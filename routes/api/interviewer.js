const express=require("express")
const router=express.Router()
const {viewTeam,view,update,interviews,interviewDetails,interviewDone} =require("../actions/interviewer-function")

router.get("/team",viewTeam);
router.post("/view",view);
router.post("/update",update);
router.post("/interviews",interviews);
router.post("/interviewDetails",interviewDetails);
router.post("/interviewDone",interviewDone);
// router.post("/cpreSignup",cpreSignup);
// router.post('/csignin',csignin);
module.exports=router;