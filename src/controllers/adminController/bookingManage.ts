import { RequestHandler } from "express";
import { bookingManageHelper } from "../../helper/admin/bookingHelper";


export  const bookingManageApi :RequestHandler = async(req,res)=>{
    try {
        const fetch = await bookingManageHelper()
    
        
        res.json({success:true,fetch}).status(200)
    } catch (error) {
        console.log(error);
        
    }
}