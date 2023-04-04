import mongoose, { model } from "mongoose";
import {categoryInterface} from '../interface/category_interface'
const categorySchema = new mongoose.Schema<categoryInterface>({
    packageCategory:{
        type:String
    }
    
})

export default mongoose.model('Packagecategory',categorySchema)