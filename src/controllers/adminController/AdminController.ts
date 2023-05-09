import { RequestHandler } from "express";
import { AdminLoginHelper, fetchBookingCount, fetchTotalRevenueCount, fetchUserDetails } from "../../helper/admin/adminHome";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createToken } from "../../utils/JWT_generator";
import adminModel from "../../model/adminModel";
export const AdminLogin :RequestHandler = async(req,res)=>{
    try {
        let {email,password} = req.body
        const data = {
            email
        }
        const admin = await AdminLoginHelper(data)
        if(!admin){
            res.json({ action:true}).status(200);
        }else{
            const encryptPassword = admin.password
            const matchPassword = await bcrypt.compare(
                password,
                encryptPassword
            );
            if(matchPassword){
                const token = createToken(admin._id)
                    res.status(200).json({
                         success: true,
                         token,
                        admin
                        })
                }else{
                    res.status(200).json({ success: false})
                }

        }
        
        
    } catch (error) {
        console.log(error);
        
    }
}

export const AdminVerificationApi :RequestHandler = async(req,res)=>{
    try {
    
        const token = req.body.token;

        if(!token){
            res.json({ admin: false });
            
        }else{
            const decoded :any = jwt.verify(token, process.env.JWT_SECRET as string);
              const adminId = decoded.id 
              const admin = await adminModel.findById(adminId);
              
               
              if (admin) {
                 res.status(200).json({ admin: true });
              }else{
                res.json({ admin: false });
              } 
        }
        
    
       
      } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
      }
    
}

export const bookingCountApi :RequestHandler = async(req,res)=>{
    try {
        const bookingCount = await fetchBookingCount()
        res.status(200).json({ sucess: true ,bookingCount});
        
        
    } catch (error) {
        console.log(error);
        
    }
}

export const ClientCountApi :RequestHandler = async(req,res)=>{
    try {
        const ClientsCount = await fetchBookingCount()
        res.status(200).json({ sucess: true ,ClientsCount});
        
        
        
    } catch (error) {
        console.log(error);
        
    }
}

export const TotalRevenueCountApi :RequestHandler = async(req,res)=>{
    try {
        
        const totalRevenue = await fetchTotalRevenueCount()
        res.status(200).json({ sucess: true ,totalRevenue});
        
        
        
    } catch (error) {
        console.log(error);
        
    }
}

export const getUSerApi :RequestHandler = async(req,res)=>{
    try {
        
        const fetch = await fetchUserDetails()
        res.status(200).json({ sucess: true ,fetch});
        
        
        
    } catch (error) {
        console.log(error);
        
    }
}
