import mongoose from "mongoose";
import BookingModel from "../../model/bookingModel";
import Review from "../../model/reviewModel";

export const destinfetchHelper  = async(id:string):Promise<object|undefined> =>{
   try {
      const response = await BookingModel.find({userDetails:id}).populate('Destination').populate('ReviewId')
      return response
   } catch (error) {
    console.log(error);
    
   }
}

export const postReviewData = async(data:any):Promise<any>=>{
    try {
        const {id,userId,textarea, serviceRate, valueMoney, communication, planing} = data
        const destinId = new mongoose.Types.ObjectId(id)
        const userID = new mongoose.Types.ObjectId(userId)
        const reviewCollection = new Review({
            DestinationId:destinId,
            UserId:userID,
            rating:{
                serviceRate,
                valueMoney,
                communication,
                planing
            },
            textarea
        })
        await reviewCollection.save()
       const reviewId = reviewCollection._id

       const updateBookingCollection = await BookingModel.updateOne(
        {Destination:destinId},
        {$set: {ReviewId:reviewId}}
        )
        console.log(updateBookingCollection);
        
        return reviewCollection
        

    } catch (error) {
        console.log(error);
        
    }
}

export const updateTheReview = async(data:any):Promise<any>=>{
    try {
        const {id, textarea, serviceRate, valueMoney, communication, planing} = data
        let update;
        update = {
            rating:{
                serviceRate,
                valueMoney,
                communication,
                planing
            },
            textarea
        }

        const response = await Review.findByIdAndUpdate(id, update, { new: true }).exec();
        return response

    } catch (error) {
        console.log(error);
        
    }
}
export const DeleteTheReview = async(id:string):Promise<any>=>{
    try {
        const deletedReview = await Review.findByIdAndDelete(id);
         return deletedReview

    } catch (error) {
        console.log(error);
        
    }
}

export const FetchTheReview = async():Promise<object|undefined>=>{
    try {
        const fetch = await Review.find().populate('UserId').populate('DestinationId')
         return fetch

    } catch (error) {
        console.log(error);
        
    }
}