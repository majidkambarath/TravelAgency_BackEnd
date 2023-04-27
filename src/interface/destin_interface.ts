import mongoose, { ObjectId } from "mongoose";
export interface destinaInterface {
  _id: mongoose.Types.ObjectId;
  title: string;
  descrption: string;
  Highlights:string;
  price: number;
  guests:number;
  file:string[];
  packageCategory: ObjectId;
  activity: ObjectId;
  priceCategory: string;
  Included:string[]
  Excluded:string[]
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
