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
      Highlights
    } = req.body;
  const imgArray:string[] = []
  const multiImg:any = req.files
  multiImg.map((el:any)=>{
     const em = el.path
      imgArray.push(em)
  }) 
  console.log(req.body);
  let {Included1,Included2,Included3,Included4,Included5}=req.body
  const Included = [Included1,Included2,Included3,Included4,Included5]
  let {Excluded1,Excluded2,Excluded3,Excluded4,Excluded5}=req.body
  const Excluded = [Excluded1,Excluded2,Excluded3,Excluded4,Excluded5]
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
      imgArray,
      Included,
      Excluded,
      Highlights
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
