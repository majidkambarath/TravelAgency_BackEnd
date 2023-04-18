import categoryModel from "../../model/categoryModel";
import activityModel from "../../model/activityModel";

export const packageIdfetch = {
    packageApi :async(id:string):Promise<any>=>{
        try {
            const packageCatefetch = await categoryModel.findById({_id:id})
            return packageCatefetch
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const activityIdfetch = {
    activityApi :async(id:string):Promise<any>=>{
        try {
            const activtityfetch = await activityModel.findById({_id:id})
            return activtityfetch
        } catch (error) {
            console.log(error);
            
        }
    }
}