const express=require("express")
const router=express.Router()
const {postJob} =require("../actions/company-function")

router.post("/post-job",postJob);
//router.post("/view",view);
// router.post("/cpreSignup",cpreSignup);
// router.post('/csignin',csignin);
module.exports=router;