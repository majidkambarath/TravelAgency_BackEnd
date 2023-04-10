import mongoose from "mongoose"
export interface categoryInterface{
    _id:mongoose.Types.ObjectId,
    packageCategory? : string,
    file:string
 
}