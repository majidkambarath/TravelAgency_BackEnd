import mongoose from "mongoose";
import {activityInterface} from '../interface/activity_interface'
const activitySchema = new mongoose.Schema<activityInterface>({
    activtiy:{
    type:String
   }
    
})

export default mongoose.model('Packageactivity',activitySchema)