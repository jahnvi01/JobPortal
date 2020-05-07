const express=require("express")
const router=express.Router()
const {postJob,updateDetails,companyDetails,jobs} =require("../actions/company-function")

router.post("/post-job",postJob);
router.post("/update",updateDetails);
router.post("/view",companyDetails);
router.post("/jobs",jobs);
// router.post('/csignin',csignin);
module.exports=router;