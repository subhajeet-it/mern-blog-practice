import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { updateUser,deleteUser } from "../controllers/user.controller.js";
const router=express.Router();

router.get("/test",(req,res)=>{
    res.send("Das")
    
})

router.put("/update/:userId",verifyToken,updateUser)
router.delete("/delete/:userId",verifyToken,deleteUser)

export default router;