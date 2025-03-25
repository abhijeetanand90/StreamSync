import express from "express";
import User from "../models/User";

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

export default router;