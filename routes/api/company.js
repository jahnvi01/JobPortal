const express=require("express")
const router=express.Router()
const {postJob,updateDetails,companyDetails,jobs,candidates,candidatesDetails,companyInterview} =require("../actions/company-function")

router.post("/post-job",postJob);
router.post("/update",updateDetails);
router.post("/view",companyDetails);
router.post("/jobs",jobs);
router.post("/candidates",candidates);
router.post("/candidate-details",candidatesDetails);
router.post('/companyInterview',companyInterview);
module.exports=router;