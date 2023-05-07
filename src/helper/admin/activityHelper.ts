import activityModel from '../../model/activityModel';
import {activityInterface} from '../../interface/activity_interface'
export const activityHelper = {
    activityCreate: async(data:string):Promise<activityInterface|undefined>=>{
         try {
            const activtiyManage = new activityModel({activtiy:data});
            await activtiyManage.save()
            return activtiyManage
         } catch (error) {
            console.log(error);
            
         }
    }
}
export const fetchingHelper = {
    fetchingApi :async():Promise<string[]|any>=>{
            const fetchingData = await activityModel.find();
            return fetchingData;
    }
}