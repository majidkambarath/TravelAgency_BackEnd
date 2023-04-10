import { File } from "buffer";
import { RequestHandler } from "express";

import {
  packageIdFetch,
  activityIdFetch,
  createCollection,
  fetchHelper,
} from "../../helper/admin/destinHelper";

export const add_destina: RequestHandler = async (req, res) => {
  try {
    let {
      title,
      descrption,
      price,
      packageCategory,
      activity,
      priceCategory,
      day,
      night,
      Hotels,
      Flight,
      Sightseeing,
      Meals,
      Transfers,
    } = req.body;
  const imgArray:string[] = []
  const multiImg:any = req.files
  multiImg.map((el:any)=>{
     const em = el.path
      imgArray.push(em)
  }) 

    const packageID = await packageIdFetch.packageId(packageCategory);
    const activityID = await activityIdFetch.activityId(activity);
    const data = {
      title,
      descrption,
      price,
      priceCategory,
      day,
      night,
      Hotels,
      Flight,
      Sightseeing,
      Meals,
      Transfers,
      activityID,
      packageID,
      imgArray
    };
    const createCollections = await createCollection.destinCollection(data)
        res.json({success:true}).status(200)
        
    
    
    
  } catch (error) {
    console.log(error);
  }
};

export const fetchDestin :RequestHandler = async(req,res)=>{
   try {
    const fetch = await fetchHelper.destinData()
    res.json({success:true,fetch}).status(200)
   } catch (error) {
    console.log(error);
    
   }
}
