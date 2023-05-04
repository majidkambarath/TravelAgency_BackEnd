import destinModel from "../../model/destinModel";
import { RequestHandler,Request } from "express";
import { fetchPackage } from "../../helper/user/packageCateHelper";
import { destinViewHelper } from "../../helper/user/destinViewHelper";
import { activityIdfetch, packageIdfetch } from "../../helper/user/fetchID";
import { fillerHelper } from "../../helper/user/fillterHelper";

export const packageCategory: RequestHandler = async (req, res) => {
  try {
    const id: any = req.query.id;
    console.log(req.query.id);
    const fetch = await fetchPackage.fetchCategoryApi(id);

    res.json({ success: true, fetch }).status(200);
  } catch (error) {
    console.log(error);
  }
};
interface RequestWithUser extends Request {
  Token?: any;
}
export const destinViewData: RequestHandler = async (req:RequestWithUser, res) => {
  try {
    const id = req.query.id as string

    
    const fetch = await destinViewHelper.destinViewApi(id);
    
    const packageID = await fetch.packageCategory;
    console.log(packageID);
    
    const activityID = await fetch.activity;
    const packageCategoryID = await packageIdfetch.packageApi(packageID);
    const activityDataID = await activityIdfetch.activityApi(activityID);


    const packageCategory = packageCategoryID.packageCategory;
    const activities = activityDataID.activtiy;


    res.json({ success: true, fetch, packageCategory, activities }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ error: "not fsfs" }).status(401);
  }
};
export const fillterContorl : RequestHandler= async(req,res)=>{
  try {
   let activity = req.query.activity as string;
   let title = req.query.descrption as string;
   let guests = req.query.guests as string;
   let priceCategory = req.query.priceCategory as string;
 
 const fillterData = await fillerHelper(title,activity,guests,priceCategory)
 res.json({ success: true, fillterData }).status(200);
     
  } catch (error) {
    console.log(error);
    
  }
}
