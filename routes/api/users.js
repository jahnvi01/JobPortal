const express=require("express")
const router=express.Router()
const {profile,view} =require("../actions/user-function")

router.post("/profile",profile);
router.post("/view",view);
// router.post("/cpreSignup",cpreSignup);
// router.post('/csignin',csignin);
module.exports=router;