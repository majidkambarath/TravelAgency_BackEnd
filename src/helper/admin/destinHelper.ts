import activityModel from "../../model/activityModel";
import categoryModel from "../../model/categoryModel";
import destinModel from "../../model/destinModel";
import { destinaInterface } from "../../interface/destin_interface";
export const packageIdFetch = {
    packageId:async(packageCategory:string):Promise<any>=>{
         try {
            const IDFetch = await categoryModel.findOne({packageCategory}) 
            const categoryID = IDFetch?._id
            return categoryID
            
            
         } catch (error) {
            console.log(error);
            
         }
    }
}

export const activityIdFetch = {
    activityId:async(activity:string):Promise<any>=>{
        try {
            const activiFetch = await activityModel.findOne({activtiy:activity})
            const activityId = activiFetch?._id
            return activityId
            
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const createCollection = {
    destinCollection:async(data:any):Promise<any>=>{
        try {
            let prePrice = +data.price
            let preDay = +data.day
            let preNight = +data.night
            const destinCreation = new destinModel({
                title:data.title,
                descrption:data.descrption,
                Highlights:data.Highlights,
                price:prePrice,
               file:data.imgArray,
               Included:data.Included,
               Excluded:data.Excluded,
                packageCategory:data.packageID,
                activity:data.activityID,
                priceCategory:data.priceCategory,
                duration:{
                    day:preDay,
                    night:preNight
                },
                packageService:{
                    Hotels:data.Hotels,
                    Flight:data.Flight,
                    Sightseeing:data.Sightseeing,
                    Meals:data.Meals,
                    Transfers:data.Transfers
                }
            })
            
            await destinCreation.save()
            return destinCreation
        } catch (error) {
            console.log(error);
            
        }
        
    }
}

export const fetchHelper ={
   destinData:async():Promise<string[]|any>=>{
     try {
        const fetchData = await destinModel.find()
        return fetchData
     } catch (error) {
        console.log(error);
        
     }
   }
}