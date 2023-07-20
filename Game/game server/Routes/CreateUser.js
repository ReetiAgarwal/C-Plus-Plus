const express = require("express");
const router = express.Router();
const User = require("../models/User")
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtSecert="Mynameiswebdeveloperandprogrammer##";
router.post("/signup",async(req,res)=>{
    const salt=await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt);
    try{
        await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email
        })
        res.json({success:true});
    //     const docs=await User.find({});
    // console.log(docs);
    }
    catch(err){
        console.log(err);
        res.json({success:false});
    }
})

router.post("/login",async(req,res)=>{
    let email=req.body.email;
    try{
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors:"Try logging with correct credentials"});
        }
        const pwdCompare=await bcrypt.compare(req.body.password,userData.password);
        if(!pwdCompare){
            return res.status(400).json({errors:"Try logging with correct credentials"});
        }
        const data={
            user:{
                id:userData.id
            }
        }
        const authToken=jwt.sign(data,jwtSecert);
        return res.json({success:true,authToken:authToken});
    }
    catch(err){
        console.log(err);
        res.json({success:false});
    }
})


module.exports=router;