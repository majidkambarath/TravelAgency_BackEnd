import mongoose from "mongoose";
import { destinaInterface } from "../interface/destin_interface";
const destinSchema = new mongoose.Schema<destinaInterface>({
    title:{
        type:String
    },
    descrption:{
        type:String
    },
    Highlights:{
        type:String
    },
   price:{
    type:Number
   },
   guests:{
    type:Number
   },
   file:[String],
   Included:[String],
   Excluded:[String],
   packageCategory:{
    type:mongoose.Types.ObjectId,
    ref:'Packagecategory'
   },
   activity:{
    type:mongoose.Types.ObjectId,
    ref:'Packageactivity'
   },
   priceCategory:{
    type:String
   },
   duration:{
    day:Number,
    night:Number
   },
   packageService:{
    Hotels: String,
    Flight:String,
    Sightseeing:String,
    Meals:String,
    Transfers:String,
   }

})

export default mongoose.model('Destination',destinSchema)