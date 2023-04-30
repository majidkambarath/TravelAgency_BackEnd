import mongoose from "mongoose";
import destinModel from "../../model/destinModel";
import {  ObjectId } from "mongodb";
export const destinViewHelper = {
    destinViewApi:async(id:string):Promise<any> =>{
        try {
            // console.log(id);
            //  const ID = new ObjectId(id)
            // console.log(ID);
        
            const destinview = await destinModel.findById({_id:id})  
            return destinview
        } catch (error) {
            console.log(error);
            
            
        }
    }
}