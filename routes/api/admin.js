const express=require("express")
const router=express.Router()
const {admin_signin,getUsers,getCompanies,getApplicants,scheduleInterview,getSchedule} =require("../actions/admin-function")
router.get("/users",getUsers);
router.get("/companies",getCompanies);
router.post("/adminSignin",admin_signin);
router.post("/schedule-interview",scheduleInterview);
router.post("/applicants",getApplicants);
router.post("/getSchedule",getSchedule);
module.exports=router;