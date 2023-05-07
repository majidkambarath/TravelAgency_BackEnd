import mongoose from "mongoose";
import BookingModel from "../../model/bookingModel";
import { UserModel } from "../../model/userModel";

export const profileUpdation = async(data:any):Promise<any>=>{
try {
    const prePhone = +data.phone;
    const updateData = {
        first: data.fname,
        last: data.lname,
        address: data.address,
        email: data.email,
        phone: prePhone,
        profile:data.path,
      };
      const filter = { _id: data.userId };
      const update = { $set: updateData };
      const userCollectionUpdate = await UserModel.findOneAndUpdate(filter, update,{new: true});
      return userCollectionUpdate;
} catch (error) {
    console.log(error);
    
}
}

export const bookingDetails = async(id:string):Promise<any>=>{
    try {
        const UserID = new mongoose.Types.ObjectId(id)
        const response = await BookingModel.find({userDetails:UserID})
        
        return response 
    } catch (error) {
        
    }
}

export const bookingDetailsShowsHelper = async(BookingID:string):Promise<any>=>{
    try {
         const response = await BookingModel.findOne({_id:BookingID})
         return response
    } catch (error) {
        
    }
}

export const bookingDetailsCancel = async(BookingID:string):Promise<any>=>{
    try {
         const response = await BookingModel.findOneAndUpdate({_id:BookingID},{$set :{BookingStatus:'Cancelled'} } , {new: true})
         return response
    } catch (error) {
        
    }
}