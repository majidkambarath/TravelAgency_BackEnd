import { Request, RequestHandler, Response } from "express";
import { activityHelper, fetchingHelper } from "../../helper/admin/activityHelper";

export const activtiyManage = async(req:Request,res:Response)=>{
     try {
        const {data}=(req.body);
        await activityHelper.activityCreate(data)
        res.json({success:true}).status(200)
     } catch (error) {
        console.log(error);
        
     }
}

export const fetchingActivity :RequestHandler = async(req,res)=>{
      try {
         const fetch = await fetchingHelper.fetchingApi()
         res.json({success:true,fetch}).status(200)
      } catch (error) {
         console.log(error);
         
      }
}