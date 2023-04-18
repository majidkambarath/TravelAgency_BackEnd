import { RequestHandler } from "express";
import { signupSchema } from "../../validation/auth_schema";
import { IUser } from "../../model/userModel";
export const authSignup :RequestHandler = async(req,res)=>{
    try {
        const formData : IUser = req.body
        signupSchema.validate(formData)
        .then(async(validationData)=>{
           
            
        })
       
        
    } catch (error) {
        console.log(error);
        
    }
}