import { RequestHandler } from "express";
import {
  packageIdFetch,
  activityIdFetch,
  createCollection,
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
    const path = req.file?.path;
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
      path,
    };
    const createCollections = await createCollection.destinCollection(data)
        res.json({success:true}).status(200)
        
    
    
    
  } catch (error) {
    console.log(error);
  }
};
