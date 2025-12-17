import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/User.js";

const router = express.Router();

//register

router.post("/register",async(req,res)=>{
    const user = await User.create(req.body);
    res.json(user);

});

//login
router.post("/login",async (req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).json({error:"Invalid credentials"})
       


        const match = await bcrypt.compare(req.body.password,user.password);
        if(!match) return res.status(400).json({error:"Invalid credentials"})
        const token = jwt.sign({ id:user._id},process.env.JWT_SECRET);
        res.json({token});


})
export default router;