const express=require("express")
const router=express.Router()
const {profile,view,jobs,viewJob,apply,resume,upload} =require("../actions/user-function")

router.post("/profile",profile);
router.post("/view",view);
router.post("/viewJob",viewJob);
router.post("/apply",apply);
router.get("/jobs",jobs);
router.post("/resume",resume);
router.post("/upload",upload);
// router.post("/cpreSignup",cpreSignup);
// router.post('/csignin',csignin);
module.exports=router;