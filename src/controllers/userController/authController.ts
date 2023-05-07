import { RequestHandler } from "express";
import { signupSchema } from "../../validation/auth_schema";
import { IUser, UserModel } from "../../model/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {userCollection,authLoginHelper} from '../../helper/user/authHelper'
import {sendVerificationToken,checkVerificationToken} from '../../config/twilio'
import { createToken } from "../../utils/JWT_generator";

const hashPassword = async(password:string)=>{
    try {
        const hash = await bcrypt.hash(password,10)
        return hash
    } catch (error) {
        console.log(error);
        
    }
}

export const authSignup :RequestHandler = async(req,res)=>{
    try {
        const formData : IUser = req.body
        console.log(typeof req.body.phone)
        signupSchema.validate(formData)
        .then(async(validationData)=>{
           const {name,email,phone,password} = validationData
            const encrypt = await hashPassword(password)
            const values = {
                name,
                email,
                phone,
                encrypt
            }
        const userData = await userCollection.userHelper(values)
        if(!userData){
            res.json({ action:true}).status(200);
        }else{
           sendVerificationToken(req.body.phone)
            res.json({ success: true,userData }).status(200);
        }
        })
      
        
    } catch (error) {
        // console.log('7777777');
        // res.status(401).json({message:'exist'})
        console.log(error);
        
    }
}

export const otpVerifiyy :RequestHandler = async(req,res)=>{
    try {
        const {code,phone} = req.body;
     const check = await checkVerificationToken(code,phone)
          if(check){
            res.status(200).json({ success: true})
          }else{
            res.status(200).json({ action: false})
          }
            
        
        
    } catch (error) {
        console.log(error);
        
    }
}

export const authLoginApi : RequestHandler = async(req,res)=>{
    try {
        const {email,password}= req.body;
        const userData = await authLoginHelper(email)
        console.log(userData);
    
        if(userData){
            const encryptPassword = userData.password
            const matchPassword = await bcrypt.compare(
                password,
                encryptPassword
            );
            if(matchPassword){
            const token = createToken(userData._id)
                res.status(200).json({
                     success: true,
                     token,
                    userData
                    })
            }else{
                res.status(200).json({ success: false})
            }
        }else{
            res.status(200).json({ action: false})
        }
        
        
    } catch (error) {
        console.log(error);
        
    }
}

export const userVerificationApi :RequestHandler = async(req,res)=>{
    try {
    
        const token = req.body.token;

        if(!token){
            res.json({ user: false });
            
        }else{
            const decoded :any = jwt.verify(token, process.env.JWT_SECRET as string);
              const userId = decoded.id 
              const user = await UserModel.findById(userId);
               console.log(user);
               
              if (user) {
                 res.status(200).json({ user: true });
              }else{
                res.json({ user: false });
              } 
        }
        
    
       
      } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
      }
    
}