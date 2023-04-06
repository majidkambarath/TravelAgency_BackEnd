import mongoose, { ObjectId } from "mongoose";
export interface destinaInterface {
  _id: mongoose.Types.ObjectId;
  title: string;
  descrption: string;
  price: number;
  file:string[];
  packageCategory: ObjectId;
  activity: ObjectId;
  priceCategory: string;
  duration: {
    day: number;
    night: number;
  };
  packageService: {
    Hotels: string;
    Flight: string;
    Sightseeing: string;
    Meals: string;
    Transfers: string;
  };
}
