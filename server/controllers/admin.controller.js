import express from "express"
import jwt from "jsonwebtoken"

// ADMIN LOGIN FUNCTION
export const adminLogin = async (req,res)=> {
try {
    const {email , password} = req.body

    if(email != process.env.ADMIN_EMAIL || password != process.env.ADMIN_PASSWORD ){
        return res.json({success : false , message : "Incorrect Credentials"})
    }

    const token = jwt.sign({email} , process.env.JWT_SECRET_KEY)
    res.json({success : true , token})
} catch (error) {
    console.log(error.message);
    res.json({success : false , message : error.message})
    
}
}