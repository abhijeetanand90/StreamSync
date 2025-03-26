import express from "express";
import User from "../models/User.js";
import { ApiRateLimiter } from "../middleware/authMiddleware.js";
import { login } from "../controllers/authController.js";

const router=express.Router();


router.post('/test-validation', async(req, res)=>{
    try {
       const user=new User(req.body) ;
       await user.validate();
       res.json({valid:true});
    } catch (error) {

        res.json({ 
            valid: false, 
            errors: error.errors 
          });
    }
})

router.post("/login",ApiRateLimiter,login );

export default router;