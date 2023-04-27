import mongoose from "mongoose";
import activityModel from "../../model/activityModel";
import destinModel from "../../model/destinModel";

export const fillerHelper = async (
  title: string,
  activity: string,
  guests: string,
  priceCategory: string
): Promise<any> => {
  try {
    const activityCollection = await activityModel.findOne({
      activtiy: activity,
    });
    console.log(activityCollection);
    const Id = activityCollection?._id
    const ObjectID = new mongoose.Types.ObjectId(Id)
  
      
    const preGuest = +guests;
    const query = {
      title: { $regex: new RegExp(title, "i") },
      activity: { $eq:ObjectID  },
      guests: { $eq: preGuest },
      priceCategory: { $regex: new RegExp(priceCategory, "i") },
    };

    const fillter = await destinModel.find(query);
    console.log(fillter);
    return fillter;
  } catch (error) {}
};
