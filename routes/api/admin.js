const express=require("express")
const router=express.Router()
const {admin_signin,getUsers,getData,getCompanies,credits,getApplicants,getApplications,scheduleInterview,getSchedule,interviewStatus} =require("../actions/admin-function")
const {contact,feedback} =require('../actions/contact');
router.get("/users",getUsers);
router.get("/companies",getCompanies);
router.post("/adminSignin",admin_signin);
router.post("/schedule-interview",scheduleInterview);
router.post("/applicants",getApplicants);
router.post("/applications",getApplications);
router.get("/recentData",getData);
router.post("/getSchedule",getSchedule);
router.post("/credits",credits);
router.post("/contact",contact)
router.post("/feedback",feedback)
router.post("/interviewStatus",interviewStatus);
module.exports=router;