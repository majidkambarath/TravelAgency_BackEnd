 import categoryModel from "../../model/categoryModel";
import activityModel from "../../model/activityModel";
import mongoose from "mongoose";

export const packageIdfetch = {
    packageApi :async(id:string):Promise<any>=>{
        try {
            const ID = new mongoose.Types.ObjectId(id)
            const packageCatefetch = await categoryModel.findById({_id:ID})
            return packageCatefetch
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const activityIdfetch = {
    activityApi :async(id:string):Promise<any>=>{
        try {
            const ID = new mongoose.Types.ObjectId(id)
            const activtityfetch = await activityModel.findById({_id:ID})
            return activtityfetch
        } catch (error) {
            console.log(error);
            
        }
    }
}